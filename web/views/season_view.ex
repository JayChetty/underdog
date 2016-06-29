defmodule Underdog.SeasonView do
  use Underdog.Web, :view

  def render("index.json", %{seasons: seasons}) do
    %{data: render_many(seasons, Underdog.SeasonView, "season.json")}
  end

  def render("show.json", %{season: season}) do
    %{data: render_one(season, Underdog.SeasonView, "season.json")}
  end

  def render("season.json", %{season: season}) do
    %{id: season.id,
      start_year: season.start_year,
      league_id: season.league_id}
  end
end
