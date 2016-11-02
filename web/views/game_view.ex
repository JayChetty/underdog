defmodule Underdog.GameView do
  use Underdog.Web, :view
  require Logger
  alias Underdog.UnderdogPointsCalculator
  alias Underdog.LeaguePointsCalculator

  def render("index.json", %{ weeks: weeks, team_points: team_points, groups: groups, predictions: predictions }) do
    weeks = Enum.map(weeks, fn(week)->
      sorted_fixtures = Enum.sort(week.fixtures, fn(fix_1, fix_2)->
        Ecto.DateTime.to_erl(fix_1.start_time) < Ecto.DateTime.to_erl(fix_2.start_time)
      end)
      fixtures_data = Enum.map(sorted_fixtures, fn(fixture)->
        home_team_points = team_points[ fixture.home_team.id ]
        away_team_points = team_points[ fixture.away_team.id ]

        total_home_team_points = LeaguePointsCalculator.points_to_week( home_team_points, week.number )
        total_away_team_points = LeaguePointsCalculator.points_to_week( away_team_points, week.number )

        is_draw = fixture.away_team_score == fixture.home_team_score
        no_result = !fixture.home_team_score

        home_team_favorate = total_home_team_points > total_away_team_points
        away_team_favorate = total_home_team_points < total_away_team_points

        away_team_upset = home_team_favorate && fixture.away_team_score > fixture.home_team_score
        home_team_upset = away_team_favorate && fixture.away_team_score < fixture.home_team_score

        home_team_ug_points = UnderdogPointsCalculator.points( total_home_team_points, total_away_team_points )
        away_team_ug_points = UnderdogPointsCalculator.points( total_away_team_points, total_home_team_points )

        # is_draw = fixture.away_team_score == fixture.home_team_score

        is_upset = away_team_upset || home_team_upset


        par_score = case { is_upset, is_draw } do
          { false, false} -> 3
          { _, _} -> 0
        end

        predicted_upset_modifier = max( home_team_ug_points, away_team_ug_points) - 3

        upset_modifier = case { is_upset, is_draw } do
          { true, _ } -> max( home_team_ug_points, away_team_ug_points)
          { false, true } -> 0
          { false, false } -> -3
        end

        %{id: fixture.id,
          start_time: fixture.start_time,
          week_id: fixture.week_id,
          home_team_id: fixture.home_team_id,
          away_team_id: fixture.away_team_id,
          home_team_score: fixture.home_team_score,
          away_team_score: fixture.away_team_score,
          home_team_ug_points: home_team_ug_points,
          away_team_ug_points: away_team_ug_points ,
          away_team: %{id: fixture.away_team.id,
                name: fixture.away_team.name,
                image: fixture.away_team.image,
                # points: away_team_points
              },
          home_team: %{id: fixture.home_team.id,
              name: fixture.home_team.name,
              image: fixture.home_team.image,
              # points: home_team_points
          },
          is_upset: is_upset,
          par_score: par_score,
          upset_modifier: upset_modifier,
          predicted_upset_modifier: predicted_upset_modifier
        }
      end)

      week_par = fixtures_data
        |> Enum.map(fn fixture -> fixture.par_score end)
        |> Enum.sum


      %{id: week.id,
        start_date: week.start_date,
        number: week.number,
        season_id: week.season_id,
        fixtures: fixtures_data,
        week_par: week_par
      }
    end)

    %{
      weeks: weeks,
      groups: render_many(groups, Underdog.GroupView, "group.json"),
      predictions: render_many(predictions, Underdog.PredictionView, "prediction.json"),
    }
  end


end
