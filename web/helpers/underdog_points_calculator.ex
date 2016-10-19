defmodule Underdog.UnderdogPointsCalculator do
  def points(team_points, opponent_points) do
    points_difference = team_points - opponent_points
    case points_difference do
      points_difference when points_difference > 0 -> 3
      _ -> (points_difference * -1) + 3
    end
  end
end
