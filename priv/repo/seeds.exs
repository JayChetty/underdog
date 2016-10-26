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
require Underdog.FixtureJsonParser
require Poison

defmodule SeedHelper do


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

Underdog.Repo.delete_all(Underdog.Group)
Underdog.Repo.delete_all(Underdog.Membership)

league = %Underdog.League{name: "Premier League"}
{:ok, inserted_league} = Underdog.Repo.insert(league)

season = %Underdog.Season{start_year: 2015, league_id: inserted_league.id, game_week: 9 }
{:ok, inserted_season} = Underdog.Repo.insert(season)

#year month day weeknumber
weeks_data = [
  {2016,08,13,1},
  {2016,08,20,2},
  {2016,08,27,3},
  {2016,09,10,4},
  {2016,09,17,5},
  {2016,09,24,6},
  {2016,10,01,7},
  {2016,10,15,8},
  {2016,10,22,9},
  {2016,10,29,10},
  {2016,11,05,11},
  {2016,11,19,12},
  {2016,11,26,13},
  {2016,12,03,14},
  {2016,12,10,15},
  {2016,12,13,16},
  {2016,12,17,17},
  {2016,10,26,18},
  {2016,10,31,19},
  {2017,01,02,20},
  {2017,01,14,21},
  {2017,01,21,22},
  {2017,01,31,23},
  {2017,02,03,24},
  {2017,02,11,25},
  {2017,02,25,26},
  {2017,03,04,27},
  {2017,03,11,28},
  {2017,03,18,29},
  {2017,04,01,30},
  {2017,04,04,31},
  {2017,04,08,32},
  {2017,04,15,33},
  {2017,04,22,34},
  {2017,04,29,35},
  {2017,05,06,36},
  {2017,05,13,37},
  {2017,05,21,38},
]

weeks = Enum.map( weeks_data, fn(week_data)->
  SeedHelper.create_week(
    elem(week_data,0),elem(week_data,1),elem(week_data,2),elem(week_data,3), inserted_season.id
  )
end)

teams = SeedHelper.create_teams( Enum.to_list( Underdog.FixtureJsonParser.team_symbol_to_data ) )

{:ok, json_file} = File.read "priv/repo/fixtures_new.json"
fixtures_data = Poison.decode!(json_file)
fixtures_list = fixtures_data["fixtures"]

fixtures_map = Underdog.FixtureJsonParser.minimise_fixtures( fixtures_list )

inserted_fixtures_list= Enum.map(weeks, fn( week ) ->
  Logger.warn( "Week number #{ week.number }")
  SeedHelper.create_fixtures(week, fixtures_map[week.number], teams)
end)

user_jay_params = %{name: "jaychetty", email: "jay@email.com", password: "password"}
user_rick_params = %{name: "rickhenry", email: "rick@email.com", password: "password"}

user_jay_changeset = Underdog.User.changeset( %Underdog.User{}, user_jay_params )
user_rick_changeset = Underdog.User.changeset( %Underdog.User{}, user_rick_params )

{:ok, jay} =  Underdog.Repo.insert( user_jay_changeset )
{:ok, rick} =  Underdog.Repo.insert( user_rick_changeset )

group_params = %{ name: "Creators" }
group_changeset = Underdog.Group.changeset( %Underdog.Group{}, group_params )
{:ok, creators} = Underdog.Repo.insert( group_changeset )

jay_creators_params = %{ user_id: jay.id, group_id: creators.id }
rick_creators_params = %{ user_id: rick.id, group_id: creators.id }

jay_membership = Ecto.build_assoc( jay, :memberships)
rick_membership = Ecto.build_assoc( rick, :memberships)

jay_creators_changeset = Underdog.Membership.changeset( jay_membership, jay_creators_params )
rick_creators_changeset = Underdog.Membership.changeset( rick_membership, rick_creators_params )

{ :ok, _ } =  Underdog.Repo.insert( jay_creators_changeset )
{ :ok, _ } =  Underdog.Repo.insert( rick_creators_changeset )



# Logger.debug "week_1_fixtures #{inspect hd(week_1_fixtures).id}"
# prediction = %Underdog.Prediction{
#   type: "upset",
#   user_id: jay.id,
#   fixture_id: hd(week_2_fixtures).id
# }



# {:ok, inserted_prediction} =  Underdog.Repo.insert( prediction )
