require Logger
require Underdog.FixtureJsonParser
require Underdog.Repo
require HTTPotion
alias Underdog.Repo

#if have a result and the existing fixture doesn't. update the result.

# {:ok, json_file} = File.read "priv/repo/fixtures_new_play.json"
response = HTTPotion.get "http://api.football-data.org/v1/competitions/426/fixtures"
json_file = response.body

fixtures_data = Poison.decode!(json_file)
fixtures_list = fixtures_data["fixtures"]


#Update fixture dates
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
