require Logger
require Underdog.Repo
require HTTPotion
alias Underdog.Repo

response = HTTPotion.get "http://api.football-data.org/v1/competitions/426"
json_file = response.body

season_data = Poison.decode!(json_file)
game_week = season_data["currentMatchday"]

first_season = List.first( Repo.all( Underdog.Season ) )

changeset = Underdog.Season.changeset( first_season, %{ game_week: game_week } )
Repo.update( changeset )
