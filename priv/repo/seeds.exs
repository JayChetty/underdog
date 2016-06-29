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

Underdog.Repo.delete_all(Underdog.League)
league = %Underdog.League{name: "Premier League"}
{:ok, inserted_league} = Underdog.Repo.insert(league)
