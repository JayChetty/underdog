defmodule Underdog.FixtureView do
  use Underdog.Web, :view

  def render("index.json", %{fixtures: fixtures}) do
    %{data: render_many(fixtures, Underdog.FixtureView, "fixture.json")}
  end

  def render("show.json", %{fixture: fixture}) do
    %{data: render_one(fixture, Underdog.FixtureView, "fixture.json")}
  end

  def render("fixture.json", %{fixture: fixture}) do
    %{id: fixture.id,
      start_time: fixture.start_time,
      home_team_id: fixture.home_team_id,
      away_team_id: fixture.away_team_id
    }
  end
end
