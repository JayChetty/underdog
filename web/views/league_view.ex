defmodule Underdog.LeagueView do
  use Underdog.Web, :view

  def render("index.json", %{leagues: leagues}) do
    %{data: render_many(leagues, Underdog.LeagueView, "league.json")}
  end

  def render("show.json", %{league: league}) do
    %{data: render_one(league, Underdog.LeagueView, "league.json")}
  end

  def render("league.json", %{league: league}) do
    %{id: league.id,
      name: league.name}
  end
end
