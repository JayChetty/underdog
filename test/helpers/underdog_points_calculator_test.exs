defmodule Underdog.UnderdogPointsCalculatorTest do
  # use Underdog.ModelCase
  require Logger
  use ExUnit.Case
  alias Underdog.UnderdogPointsCalculator

  test "returns 3 points when favorate" do
    team_league_points = 15
    opponent_league_points = 10
    assert 3 == UnderdogPointsCalculator.points( team_league_points, opponent_league_points )
  end

  test "returns difference + 3 when not favorate" do
    team_league_points = 10
    opponent_league_points = 15
    assert 8 == UnderdogPointsCalculator.points( team_league_points, opponent_league_points )
  end

  test "returns difference 3 when the same points" do
    team_league_points = 10
    opponent_league_points = 10
    assert 3 == UnderdogPointsCalculator.points( team_league_points, opponent_league_points )
  end
end
