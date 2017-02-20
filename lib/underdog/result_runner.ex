defmodule Underdog.ResultRunner do
  use GenServer
  require Logger
  require Underdog.FixtureJsonParser
  require Underdog.Repo
  require HTTPotion
  alias Underdog.Repo

  def start_link do
    GenServer.start_link(__MODULE__, %{})
  end

  def init(state) do
    schedule_work() # Schedule work to be performed at some point
    {:ok, state}
  end

  def handle_info(:work, state) do
    # Do the work you desire here
    Logger.disable( self )
    update_dates()
    updated_results = update_results()
    Logger.enable( self )
    if List.first(updated_results) do
      Logger.warn "Broadcasting updated results #{inspect updated_results}"
      Underdog.Endpoint.broadcast!( "results", "new_results", %{fixtures: updated_results} )
      Enum.each(update_results, fn(result)->
        Underdog.GroupChannel.broadcast_firebase_topic_message(
          "results",
          "Result",
          "#{result.home_team_name} #{result.home_team_score} - #{result.away_team_score} #{result.away_team_name}",
          "/weeks",
          "results"
        )
      end)
    end
    schedule_work() # Reschedule once more
    {:noreply, state}
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 60 * 1000) # In 30 second
  end

  defp get_fixtures_from_api do
    response = HTTPotion.get(
      "http://api.football-data.org/v1/competitions/426/fixtures",
      headers: ["X-Auth-Token": "2130e4f2c38e415e988ed8c9fa617583"]
    )
    json_file = response.body
    fixtures_data = Poison.decode!(json_file)
    fixtures_data["fixtures"]
  end

  defp get_teams_from_api do
    response = HTTPotion.get(
      "http://api.football-data.org/v1/competitions/426/teams",
      headers: ["X-Auth-Token": "2130e4f2c38e415e988ed8c9fa617583"]
    )
    json_file = response.body
    fixtures_data = Poison.decode!(json_file)
    fixtures_data["teams"]
  end

  def update_results do
    fixtures_list = get_fixtures_from_api()
    updated_fixtures = Enum.map( fixtures_list, fn( fixture_map )->
      # Logger.warn "fixture_map #{ inspect fixture_map}"
      home_team_name = Underdog.FixtureJsonParser.api_name_to_name(fixture_map["homeTeamName"])
      away_team_name = Underdog.FixtureJsonParser.api_name_to_name(fixture_map["awayTeamName"])

      home_team_id = Repo.get_by(Underdog.Team, [ name: home_team_name ]).id
      week_number = fixture_map["matchday"]
      week_id = Repo.get_by(Underdog.Week, number: week_number).id
      fixture = Repo.get_by(Underdog.Fixture, [ home_team_id: home_team_id, week_id: week_id ] )

      new_result = fixture_map["result"]
      if !fixture.home_team_score && !!new_result["goalsHomeTeam"] && fixture_map["status"] == "FINISHED" do
        fixture_params = %{
          home_team_score: new_result["goalsHomeTeam"],
          away_team_score: new_result["goalsAwayTeam"]
        }
        changeset = Underdog.Fixture.changeset( fixture, fixture_params )
        {:ok, updated_fixture } = Repo.update( changeset )
        %{fixture_id: updated_fixture.id,
          home_team_score: updated_fixture.home_team_score,
          away_team_score: updated_fixture.away_team_score,
          home_team_name: home_team_name,
          away_team_name: away_team_name
        }
      else
        nil
      end
    end)
    out = Enum.filter(updated_fixtures, fn(fixture)-> !!fixture end)
    Logger.warn( "out #{inspect out}")
    out
  end

  def update_dates do
    fixtures_list = get_fixtures_from_api()

    # #Update fixture dates
    Enum.each( fixtures_list, fn( fixture_map )->
      home_team_name = Underdog.FixtureJsonParser.api_name_to_name(fixture_map["homeTeamName"])
      home_team_id = Repo.get_by(Underdog.Team, [ name: home_team_name ]).id
      week_number = fixture_map["matchday"]
      week_id = Repo.get_by(Underdog.Week, number: week_number).id
      fixture = Repo.get_by(Underdog.Fixture, [ home_team_id: home_team_id, week_id: week_id ] )

      {:ok, start_date_time } = Ecto.DateTime.cast( fixture_map["date"] )
      fixture_params = %{
        start_time: start_date_time,
      }
      changeset = Underdog.Fixture.changeset( fixture, fixture_params )
      {:ok, _ } = Repo.update( changeset )
    end)
  end

  def update_team_images do
    teams_list = get_teams_from_api()

    # #Update fixture dates
    Enum.each( teams_list, fn( team_map )->
      team_name = Underdog.FixtureJsonParser.api_name_to_name(team_map["name"])
      image_url = team_map["crestUrl"]
      if team_name == "Bournemouth" do
        image_url = "https://upload.wikimedia.org/wikipedia/en/b/bf/AFC_Bournemouth.svg"
      end
      team = Repo.get_by(Underdog.Team, [ name: team_name ])
      team_params = %{
        image: image_url,
      }
      changeset = Underdog.Team.changeset( team, team_params )
      {:ok, _ } = Repo.update( changeset )
    end)
  end
end
