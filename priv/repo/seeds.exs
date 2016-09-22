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
require Logger
defmodule SeedHelper do

  # def create_fixtures(week, fixtures, teams, true) do
  #   create_fixtures(week, fixtures, teams, 2, 1)
  # end


  def create_fixtures(week, fixtures, teams ) do

    Enum.map(fixtures, fn(fixture) ->
      fixture_data = Tuple.to_list(fixture)
      home_team = Enum.at(fixture_data, 0)
      away_team = Enum.at(fixture_data, 1)
      home_team_score_input = Enum.at(fixture_data, 2)
      away_team_score_input = Enum.at(fixture_data, 3)
      create_fixture(
        week.id,
        teams[home_team].id,
        teams[away_team].id,
        week.start_date.year,
        week.start_date.month,
        week.start_date.day,
        home_team_score_input,
        away_team_score_input
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
    inserted_fixture
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

Underdog.Repo.delete_all(Underdog.Prediction)

Underdog.Repo.delete_all(Underdog.Fixture)

Underdog.Repo.delete_all(Underdog.Week)
Underdog.Repo.delete_all(Underdog.Team)

Underdog.Repo.delete_all(Underdog.Season)
Underdog.Repo.delete_all(Underdog.League)



Underdog.Repo.delete_all(Underdog.User)


league = %Underdog.League{name: "Premier League"}
{:ok, inserted_league} = Underdog.Repo.insert(league)

season = %Underdog.Season{start_year: 2015, league_id: inserted_league.id }
{:ok, inserted_season} = Underdog.Repo.insert(season)

week_1 = SeedHelper.create_week(2016,08,13,1, inserted_season.id)
week_2 = SeedHelper.create_week(2016,08,20,2, inserted_season.id)
week_3 = SeedHelper.create_week(2016,08,27,3, inserted_season.id)
week_4 = SeedHelper.create_week(2016,09,10,4, inserted_season.id)
week_5 = SeedHelper.create_week(2016,09,17,5, inserted_season.id)
week_6 = SeedHelper.create_week(2016,09,24,6, inserted_season.id)
week_7 = SeedHelper.create_week(2016,10,01,7, inserted_season.id)
week_8 = SeedHelper.create_week(2016,10,15,8, inserted_season.id)


team_names = [
  arsenal: {"Arsenal", "http://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg"},
  bournemouth: {"Bournemouth", "https://upload.wikimedia.org/wikipedia/de/4/41/Afc_bournemouth.svg"},
  burnley: {"Burnley","http://upload.wikimedia.org/wikipedia/de/thumb/4/49/FC_Burnley.svg/376px-FC_Burnley.svg.png"},
  chelsea: {"Chelsea", "http://upload.wikimedia.org/wikipedia/de/5/5c/Chelsea_crest.svg"},
  crystal_palace: {"Crystal Palace", "http://upload.wikimedia.org/wikipedia/de/b/bf/Crystal_Palace_F.C._logo_(2013).png"},
  everton: {"Everton", "http://upload.wikimedia.org/wikipedia/de/f/f9/Everton_FC.svg"},
  hull: {"Hull City", "http://upload.wikimedia.org/wikipedia/de/a/a9/Hull_City_AFC.svg"},
  leicester: {"Leicester City","http://upload.wikimedia.org/wikipedia/en/6/63/Leicester02.png"},
  liverpool: {"Liverpool", "http://upload.wikimedia.org/wikipedia/de/0/0a/FC_Liverpool.svg"},
  man_city: {"Manchester City", "http://upload.wikimedia.org/wikipedia/de/f/fd/ManCity.svg"},
  man_utd: {"Manchester Utd", "http://upload.wikimedia.org/wikipedia/de/d/da/Manchester_United_FC.svg"},
  middlesbrough: {"Middlesbrough", "https://upload.wikimedia.org/wikipedia/en/3/34/Middlesbrough_crest.png"},
  southampton: {"Southampton", "http://upload.wikimedia.org/wikipedia/de/c/c9/FC_Southampton.svg"},
  stoke: {"Stoke City", "http://upload.wikimedia.org/wikipedia/de/a/a3/Stoke_City.svg"},
  sunderland: {"Sunderland", "http://upload.wikimedia.org/wikipedia/de/6/60/AFC_Sunderland.svg"},
  swansea: {"Swansea", "http://upload.wikimedia.org/wikipedia/de/a/ab/Swansea_City_Logo.svg"},
  tottenham: {"Tottenham Hotspur", "http://upload.wikimedia.org/wikipedia/de/b/b4/Tottenham_Hotspur.svg"},
  watford: {"Watford", "https://upload.wikimedia.org/wikipedia/en/e/e2/Watford.svg"},
  west_brom: {"West Brom","http://upload.wikimedia.org/wikipedia/de/8/8b/West_Bromwich_Albion.svg"},
  west_ham: {"West Ham", "http://upload.wikimedia.org/wikipedia/de/e/e0/West_Ham_United_FC.svg"}
]

teams = SeedHelper.create_teams(team_names)

week_1_fixtures = SeedHelper.create_fixtures(week_1, [
  {:hull, :leicester, 2, 1},
  {:arsenal, :liverpool, 3, 4},
  {:crystal_palace, :west_brom, 0,1},
  {:man_city, :sunderland, 2,1},
  {:middlesbrough, :stoke,1,1},
  {:chelsea, :west_ham,2,1},
  {:bournemouth, :man_utd,1,3},
  {:burnley, :swansea,0,1},
  {:everton, :tottenham,1,1},
  {:southampton, :watford,1,1}
], teams)
#week 2
week_2_fixtures = SeedHelper.create_fixtures(week_2, [
  {:west_ham, :bournemouth,1, 0},
  {:man_utd, :southampton,2,0},
  {:west_brom, :everton,1,2},
  {:swansea, :hull,0,2},
  {:burnley, :liverpool,2,0},
  {:tottenham, :crystal_palace,1,0},
  {:watford, :chelsea,1,2},
  {:sunderland, :middlesbrough,1,2},
  {:leicester, :arsenal,0,0},
  {:stoke, :man_city,1,4}
], teams)
#week 3
week_3_fixtures = SeedHelper.create_fixtures(week_3, [
  {:tottenham, :liverpool,1,1},
  {:chelsea, :burnley,3,0},
  {:everton, :stoke,1,0},
  {:southampton, :sunderland,1,1},
  {:watford, :arsenal,1,3},
  {:crystal_palace, :bournemouth,1,1},
  {:leicester, :swansea,2,1},
  {:hull, :man_utd,0,1},
  {:west_brom, :middlesbrough,0,0},
  {:man_city, :west_ham,3,1}
], teams)
#week 4
week_4_fixtures = SeedHelper.create_fixtures(week_4, [
  {:man_utd, :man_city,1,2},
  {:bournemouth, :west_brom,1,0},
  {:middlesbrough, :crystal_palace,1,2},
  {:stoke, :tottenham,0,4},
  {:burnley, :hull,1,1},
  {:west_ham, :watford,2,4},
  {:arsenal, :southampton,2,1},
  {:liverpool, :leicester,4,1},
  {:swansea, :chelsea,2,2},
  {:sunderland, :everton,0,3}
], teams)


week_5_fixtures = SeedHelper.create_fixtures(week_5, [
  {:chelsea, :liverpool,1,2},
  {:hull, :arsenal,1,4},
  {:west_brom, :west_ham,4,2},
  {:everton, :middlesbrough,3,1},
  {:man_city, :bournemouth,4,0},
  {:leicester, :burnley,3,0},
  {:watford, :man_utd,3,1},
  {:crystal_palace, :stoke,4,1},
  {:tottenham, :sunderland,1,0},
  {:southampton, :swansea,1,0}
], teams)


week_6_fixtures = SeedHelper.create_fixtures(week_6, [
  {:man_utd, :leicester},
  {:bournemouth, :everton},
  {:stoke, :west_brom},
  {:middlesbrough, :tottenham},
  {:west_ham, :southampton},
  {:burnley, :watford},
  {:liverpool, :hull},
  {:swansea, :man_city},
  {:sunderland, :crystal_palace},
  {:arsenal, :chelsea}
], teams)


week_7_fixtures = SeedHelper.create_fixtures(week_7, [
  {:everton, :crystal_palace},
  {:swansea, :liverpool},
  {:hull, :chelsea},
  {:watford, :bournemouth},
  {:man_utd, :stoke},
  {:tottenham, :man_city},
  {:west_ham, :middlesbrough},
  {:sunderland, :west_brom},
  {:leicester, :southampton},
  {:burnley, :arsenal}
], teams)

#week 5
week_8_fixtures = SeedHelper.create_fixtures(week_8, [
  {:chelsea, :leicester},
  {:west_brom, :tottenham},
  {:bournemouth, :hull},
  {:crystal_palace, :west_ham},
  {:arsenal, :swansea},
  {:stoke, :sunderland},
  {:man_city, :everton},
  {:middlesbrough, :watford},
  {:southampton, :burnley},
  {:liverpool, :man_utd}
], teams)


user_params = %{name: "jaychetty", email: "jay@email.com", password: "password"}

user = Underdog.User.changeset( %Underdog.User{}, user_params )


{:ok, inserted_user} =  Underdog.Repo.insert(user)


Logger.debug "week_1_fixtures #{inspect hd(week_1_fixtures).id}"
# prediction = %Underdog.Prediction{
#   type: "upset",
#   user_id: inserted_user.id,
#   fixture_id: hd(week_2_fixtures).id
# }



# {:ok, inserted_prediction} =  Underdog.Repo.insert( prediction )
