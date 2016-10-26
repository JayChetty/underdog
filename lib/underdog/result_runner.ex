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
    Logger.warn "Result runner handle info"
    Logger.disable( self )
    updated_results = update_results()
    Logger.enable( self )
    Logger.warn "Update fixtures #{inspect updated_results}"
    Underdog.Endpoint.broadcast!( "results", "new_results", %{fixtures: updated_results} )
    schedule_work() # Reschedule once more
    {:noreply, state}
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 30 * 1000) # In 30 second
  end

  defp get_fixtures_from_api do
    response = HTTPotion.get(
      "http://api.football-data.org/v1/competitions/426/fixtures",
      headers: ["X-Auth-Token": "2130e4f2c38e415e988ed8c9fa617583"]
    )
    json_file = response.body

    # {:ok, json_file} = File.read "priv/repo/fixtures_new_play.json"

    fixtures_data = Poison.decode!(json_file)
    fixtures_data["fixtures"]
  end

  def update_results do
    fixtures_list = get_fixtures_from_api()
    updated_fixtures = Enum.map( fixtures_list, fn( fixture_map )->
      # Logger.warn "fixture_map #{ inspect fixture_map}"
      home_team_name = Underdog.FixtureJsonParser.api_name_to_name(fixture_map["homeTeamName"])
      home_team_id = Repo.get_by(Underdog.Team, [ name: home_team_name ]).id
      week_number = fixture_map["matchday"]
      week_id = Repo.get_by(Underdog.Week, number: week_number).id
      fixture = Repo.get_by(Underdog.Fixture, [ home_team_id: home_team_id, week_id: week_id ] )

      new_result = fixture_map["result"]
      if !fixture.home_team_score && !!new_result["goalsHomeTeam"] do
        fixture_params = %{
          home_team_score: new_result["goalsHomeTeam"],
          away_team_score: new_result["goalsAwayTeam"]
        }
        changeset = Underdog.Fixture.changeset( fixture, fixture_params )
        {:ok, updated_fixture } = Repo.update( changeset )
        %{fixture_id: updated_fixture.id,
          home_team_score: updated_fixture.home_team_score,
          away_team_score: updated_fixture.away_team_score
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
end
