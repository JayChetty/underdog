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

  # def create_fixtures(week, fixtures, teams, true) do
  #   create_fixtures(week, fixtures, teams, 2, 1)
  # end


  def create_fixtures(week, fixtures, teams, home_team_score \\ nil, away_team_score \\ nil) do
    Enum.each(fixtures, fn(fixture) ->
      home_team = elem(fixture, 0)
      away_team = elem(fixture, 1)
      create_fixture(
        week.id,
        teams[home_team].id,
        teams[away_team].id,
        week.start_date.year,
        week.start_date.month,
        week.start_date.day,
        home_team_score,
        away_team_score
      )
    end)
  end

  def create_fixture(week_id, home_team_id, away_team_id, year, month, day, home_team_score \\ nil, away_team_score \\ nil) do
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
      away_team_id: away_team_id,
      home_team_score: home_team_score,
      away_team_score: away_team_score
    }

    {:ok, inserted_fixture} = Underdog.Repo.insert(fixture)
  end

  def create_teams(team_details) do
    #How can we do this nicely with hashmap
    Enum.map( team_details, fn( name_tuple ) -> { elem(name_tuple,0), create_team( elem(name_tuple,1) ) } end )
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

  def create_team(details) do
    team = %Underdog.Team{name: elem(details,0), image: elem(details,1)}
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

week_1 = SeedHelper.create_week(2016,08,13,1, inserted_season.id)
week_2 = SeedHelper.create_week(2016,08,20,2, inserted_season.id)


team_names = [
  arsenal: {"Arsenal FC", "http://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg"},
  bournemouth: {"Bournemouth AFC", "https://upload.wikimedia.org/wikipedia/de/4/41/Afc_bournemouth.svg"},
  burnley: {"Burnley FC","http://upload.wikimedia.org/wikipedia/de/thumb/4/49/FC_Burnley.svg/376px-FC_Burnley.svg.png"},
  chelsea: {"Chelsea FC", "http://upload.wikimedia.org/wikipedia/de/5/5c/Chelsea_crest.svg"},
  crystal_palace: {"Crystal Palace", "http://upload.wikimedia.org/wikipedia/de/b/bf/Crystal_Palace_F.C._logo_(2013).png"},
  everton: {"Everton FC", "http://upload.wikimedia.org/wikipedia/de/f/f9/Everton_FC.svg"},
  hull: {"Hull City", "http://upload.wikimedia.org/wikipedia/de/a/a9/Hull_City_AFC.svg"},
  leicester: {"Leicester City","http://upload.wikimedia.org/wikipedia/en/6/63/Leicester02.png"},
  liverpool: {"Liverpool FC", "http://upload.wikimedia.org/wikipedia/de/0/0a/FC_Liverpool.svg"},
  man_city: {"Manchester City", "http://upload.wikimedia.org/wikipedia/de/f/fd/ManCity.svg"},
  man_utd: {"Manchester United", "http://upload.wikimedia.org/wikipedia/de/d/da/Manchester_United_FC.svg"},
  middlesbrough: {"Middlesbrough FC", "https://upload.wikimedia.org/wikipedia/en/3/34/Middlesbrough_crest.png"},
  southampton: {"Southampton FC", "http://upload.wikimedia.org/wikipedia/de/c/c9/FC_Southampton.svg"},
  stoke: {"Stoke City", "http://upload.wikimedia.org/wikipedia/de/a/a3/Stoke_City.svg"},
  sunderland: {"Sunderland AFC", "http://upload.wikimedia.org/wikipedia/de/6/60/AFC_Sunderland.svg"},
  swansea: {"Swansea City", "http://upload.wikimedia.org/wikipedia/de/a/ab/Swansea_City_Logo.svg"},
  tottenham: {"Tottenham Hotspur", "http://upload.wikimedia.org/wikipedia/de/b/b4/Tottenham_Hotspur.svg"},
  watford: {"Watford FC", "https://upload.wikimedia.org/wikipedia/en/e/e2/Watford.svg"},
  west_brom: {"West Bromwich Albion","http://upload.wikimedia.org/wikipedia/de/8/8b/West_Bromwich_Albion.svg"},
  west_ham: {"West Ham United", "http://upload.wikimedia.org/wikipedia/de/e/e0/West_Ham_United_FC.svg"}
]

teams = SeedHelper.create_teams(team_names)

SeedHelper.create_fixtures(week_1, [
  {:hull, :leicester},
  {:arsenal, :liverpool},
  {:crystal_palace, :west_brom},
  {:man_city, :sunderland},
  {:middlesbrough, :stoke},
  {:chelsea, :west_ham},
  {:bournemouth, :man_utd},
  {:burnley, :swansea},
  {:everton, :tottenham},
  {:southampton, :watford}
], teams, 2, 1)
#week 2
SeedHelper.create_fixtures(week_2, [
  {:west_ham, :bournemouth},
  {:man_utd, :southampton},
  {:west_brom, :everton},
  {:swansea, :hull},
  {:liverpool, :burnley},
  {:tottenham, :crystal_palace},
  {:watford, :chelsea},
  {:sunderland, :middlesbrough},
  {:leicester, :arsenal},
  {:stoke, :man_city}
], teams)


SeedHelper.create_fixture(week_2.id, teams[:everton].id, teams[:hull].id, 2016, 8, 9)
