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
Underdog.Repo.delete_all(Underdog.Season)
Underdog.Repo.delete_all(Underdog.League)
Underdog.Week.delete_all(Underdog.Week)

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
