# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Underdog.Repo.insert!(%Underdog.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
require IEx
defmodule SeedHelper do

  def create_fixture(home_team_id, away_team_id, year, month, day) do
    fixture = %Underdog.Fixture{
      start_time: %Ecto.DateTime{
        year: year,
        month: month,
        day: day,
        hour: 15,
        min: 0,
        sec: 0
      },
      home_team_id: home_team_id,
      away_team_id: away_team_id
    }

    {:ok, inserted_fixture} = Underdog.Repo.insert(fixture)
  end

  def create_teams(team_names) do
    # Enum.map( team_names, fn { k, v } -> { k, create_team(v) } end )
    keys = Map.keys(team_names)
    teams = []
    Enum.each(keys, fn(key) ->
      teams = Map.update(team_names, key, nil, fn(name) -> create_team(name) end)
    end)
    teams
  end

  def create_team(name) do
    team = %Underdog.Team{name: name}
    {:ok, inserted_team} = Underdog.Repo.insert(team)
    inserted_team
  end
end

Underdog.Repo.delete_all(Underdog.Week)
Underdog.Repo.delete_all(Underdog.Season)
Underdog.Repo.delete_all(Underdog.Fixture)
Underdog.Repo.delete_all(Underdog.Team)
Underdog.Repo.delete_all(Underdog.League)


league = %Underdog.League{name: "Premier League"}
{:ok, inserted_league} = Underdog.Repo.insert(league)

season = %Underdog.Season{start_year: 2015, league_id: inserted_league.id }
{:ok, inserted_season} = Underdog.Repo.insert(season)

week = %Underdog.Week{
  start_date: %Ecto.Date{
    year: 2016,
    month: 8,
    day: 1
  },
  season_id: inserted_season.id,
  number: 1
}
{:ok, inserted_week} = Underdog.Repo.insert(week)


team_names = %{
  arsenal: "Arsenal FC",
  bournemouth: "Bournemouth AFC",
  burnley: "Burnley FC",
  chelsea: "Chelsea FC",
  crystal_palace: "Crystal Palace",
  everton: "Everton FC",
  hull: "Hull City",
  leicester: "Leicester City",
  liverpool: "Liverpool FC",
  man_city: "Manchester City",
  man_utd: "Manchester United",
  middlesbrough: "Middlesbrough FC",
  southampton: "Southampton FC",
  stoke: "Stoke City",
  sunderland: "Sunderland AFC",
  swansea: "Swansea City",
  tottenham: "Tottenham Hotspur",
  watford: "Watford FC",
  west_brom: "West Bromwich Albion",
  west_ham: "West Ham United"
}

teams = SeedHelper.create_teams(team_names)

IEx.pry

IO.puts teams.arsenal.name


# SeedHelper.create_fixture(teams.arsenal.id, teams.burnley.id, 2016, 8, 1)
