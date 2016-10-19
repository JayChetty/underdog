defmodule Underdog.LeaguePointsCalculatorTest do
  # use Underdog.ModelCase
  require Logger
  use ExUnit.Case
  alias Underdog.LeaguePointsCalculator

  test "creates points" do
    weeks = [
      %{
        id: 1,
        fixtures: [
          %{home_team_id: 1, home_team_score: 3, away_team_id: 2, away_team_score: 0},
          %{home_team_id: 3, home_team_score: 1, away_team_id: 4, away_team_score: 3}
        ]
      },
      %{
        id: 2,
        fixtures: [
          %{home_team_id: 2, home_team_score: 1, away_team_id: 3, away_team_score: 3},
          %{home_team_id: 4, home_team_score: 2, away_team_id: 1, away_team_score: 2}
        ]
      }
    ]
    output = [ 3, 1 ]
    assert output == LeaguePointsCalculator.points_for_team( 1, weeks )
  end

  test "handles future weeks" do
    weeks = [
      %{
        id: 1,
        fixtures: [
          %{home_team_id: 1, home_team_score: 3, away_team_id: 2, away_team_score: 0},
          %{home_team_id: 3, home_team_score: 1, away_team_id: 4, away_team_score: 3}
        ]
      },
      %{
        id: 2,
        fixtures: [
          %{home_team_id: 2, home_team_score: nil, away_team_id: 3, away_team_score: nil},
          %{home_team_id: 4, home_team_score: nil, away_team_id: 1, away_team_score: nil}
        ]
      }
    ]
    output = [ 3, 0 ]
    assert output == LeaguePointsCalculator.points_for_team( 1, weeks )
  end


  test "create map of team points" do
    weeks = [
      %{
        id: 1,
        fixtures: [
          %{home_team_id: 1, home_team_score: 3, away_team_id: 2, away_team_score: 0},
          %{home_team_id: 3, home_team_score: 1, away_team_id: 4, away_team_score: 3}
        ]
      },
      %{
        id: 2,
        fixtures: [
          %{home_team_id: 2, home_team_score: 1, away_team_id: 3, away_team_score: 3},
          %{home_team_id: 4, home_team_score: 2, away_team_id: 1, away_team_score: 2}
        ]
      }
    ]

    output =
    %{
      1 => [3, 1],
      2 => [0, 0],
      3 => [0, 3],
      4 => [3, 1]
    }

    assert output == LeaguePointsCalculator.points_for_teams( weeks )
  end

  test "calculates points up to week" do
    points = [3, 1, 0, 3, 3]
    week_number = 3
    assert 4 == LeaguePointsCalculator.points_to_week(points, week_number )
  end

  test "calculates points for first week" do
    points = [3, 1, 0, 3, 3]
    week_number = 1
    assert 0 == LeaguePointsCalculator.points_to_week(points, week_number )
  end
end
