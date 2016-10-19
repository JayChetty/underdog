defmodule Underdog.WeekView do
  # alias Underdog.LeaguePointsCalculator
  use Underdog.Web, :view
  require Logger

  def render("index_with_points.json", %{ weeks: weeks, team_points: team_points }) do
    data = Enum.map(weeks, fn(week)->
      fixtures = Enum.map(week.fixtures, fn(fixture)->
        %{id: fixture.id,
          start_time: fixture.start_time,
          week_id: fixture.week_id,
          home_team_id: fixture.home_team_id,
          away_team_id: fixture.away_team_id,
          home_team_score: fixture.home_team_score,
          away_team_score: fixture.away_team_score,
          away_team: %{id: fixture.away_team.id,
                name: fixture.away_team.name,
                image: fixture.away_team.image,
                points: team_points[ fixture.away_team.id ]
              },
          home_team: %{id: fixture.home_team.id,
              name: fixture.home_team.name,
              image: fixture.home_team.image,
              points: team_points[ fixture.home_team.id ]
          }
        }
      end)
      %{id: week.id,
        start_date: week.start_date,
        number: week.number,
        season_id: week.season_id,
        fixtures: fixtures
      }
    end)
    %{ data: data }
  end


  def render("index.json", %{weeks: weeks }) do
    %{data: render_many(weeks, Underdog.WeekView, "week.json")}
  end

  def render("show.json", %{week: week}) do
    %{data: render_one(week, Underdog.WeekView, "week.json")}
  end

  def render("week.json", %{week: week}) do
    # Logger.warn( "week #{inspect week}")
    %{id: week.id,
      start_date: week.start_date,
      number: week.number,
      season_id: week.season_id,
      fixtures: render_many(week.fixtures, Underdog.WeekView, "fixture.json", as: :fixture)
    }
  end

  def render("fixture.json", %{fixture: fixture}) do
    %{id: fixture.id,
      start_time: fixture.start_time,
      week_id: fixture.week_id,
      home_team_id: fixture.home_team_id,
      away_team_id: fixture.away_team_id,
      home_team_score: fixture.home_team_score,
      away_team_score: fixture.away_team_score,
      away_team: render_one(fixture.away_team, Underdog.WeekView, "team.json", as: :team),
      home_team: render_one(fixture.home_team, Underdog.WeekView, "team.json", as: :team)
    }
  end

  def render("team.json", %{team: team}) do
    %{id: team.id,
      name: team.name,
      image: team.image
    }
  end

  # def render("fixture.sjon")
end
