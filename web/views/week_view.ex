defmodule Underdog.WeekView do
  use Underdog.Web, :view

  def render("index.json", %{weeks: weeks}) do
    %{data: render_many(weeks, Underdog.WeekView, "week.json")}
  end

  def render("show.json", %{week: week}) do
    %{data: render_one(week, Underdog.WeekView, "week.json")}
  end

  def render("week.json", %{week: week}) do
    %{id: week.id,
      start_date: week.start_date,
      number: week.number,
      season_id: week.season_id}
  end
end
