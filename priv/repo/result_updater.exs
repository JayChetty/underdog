#loop over fixtures
require Logger
require Underdog.FixtureJsonParser
require Underdog.Repo
alias Underdog.Repo
#get the corrosponding fixture

#if have a result and the existing fixture doesn't. update the result.
{:ok, json_file} = File.read "priv/repo/fixtures_new_play.json"
fixtures_data = Poison.decode!(json_file)
fixtures_list = fixtures_data["fixtures"]

Enum.each( fixtures_list, fn( fixture_map )->
  home_team_name = Underdog.FixtureJsonParser.api_name_to_name(fixture_map["homeTeamName"])
  home_team_id = Repo.get_by(Underdog.Team, [ name: home_team_name ]).id
  week_number = fixture_map["matchday"]
  week_id = Repo.get_by(Underdog.Week, number: week_number).id
  Logger.warn " hometeam #{inspect home_team_name}"
  Logger.warn " team id #{inspect home_team_id}"
  Logger.warn " matchday #{inspect week_number}"
  Logger.warn " week_id #{inspect week_id}"
  fixture = Repo.get_by(Underdog.Fixture, [ home_team_id: home_team_id, week_id: week_id ] )
  Logger.warn " fixture #{inspect fixture}"


  new_result = fixture_map["result"]
  if !fixture.home_team_score && new_result["homeTeamScore"] do
    fixture_params = %{
      home_team_score: new_result["homeTeamScore"],
      away_team_score: new_result["awayTeamScore"]
    }
    changeset = Fixture.changeset(fixture, fixture_params)
    Repo.update(changeset)
  end
end)
