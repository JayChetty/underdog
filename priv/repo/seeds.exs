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

  def create_fixture(week_id, home_team_id, away_team_id, year, month, day) do
    fixture = %Underdog.Fixture{
      week_id: week_id,
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
    #How can we do this nicely with hashmap
    Enum.map( team_names, fn( name_tuple ) -> { elem(name_tuple,0), create_team(elem(name_tuple,1)) } end )
  end

  def create_week(year,month,day,number,season_id) do
    week = %Underdog.Week{
      start_date: %Ecto.Date{
        year: year,
        month: month,
        day: day
      },
      season_id: season_id,
      number: number
    }
    {:ok, inserted_week} = Underdog.Repo.insert(week)
    inserted_week
  end

  def create_team(name) do
    team = %Underdog.Team{name: name}
    {:ok, inserted_team} = Underdog.Repo.insert(team)
    inserted_team
  end
end



Underdog.Repo.delete_all(Underdog.Fixture)

Underdog.Repo.delete_all(Underdog.Week)
Underdog.Repo.delete_all(Underdog.Team)

Underdog.Repo.delete_all(Underdog.Season)
Underdog.Repo.delete_all(Underdog.League)




league = %Underdog.League{name: "Premier League"}
{:ok, inserted_league} = Underdog.Repo.insert(league)

season = %Underdog.Season{start_year: 2015, league_id: inserted_league.id }
{:ok, inserted_season} = Underdog.Repo.insert(season)

week_1 = SeedHelper.create_week(2016,08,01,1, season.id)
week_2 = SeedHelper.create_week(2016,08,08,2, season.id)


team_names = [
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
]

teams = SeedHelper.create_teams(team_names)

# IEx.pry

# IO.puts teams[:arsenal].name


SeedHelper.create_fixture(week_1.id, teams[:arsenal].id, teams[:hull].id, 2016, 8, 1)
SeedHelper.create_fixture(week_2.id, teams[:everton].id, teams[:hull].id, 2016, 8, 9)
