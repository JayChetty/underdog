defmodule Underdog.LeaguePointsCalculator do
  require Logger

  def points_for_team(team_id, weeks) do
    Enum.map( weeks, fn(week)->
      fixture = Enum.find(week.fixtures, fn(fixture)->
        fixture.home_team_id == team_id || fixture.away_team_id == team_id
      end)
      case fixture.home_team_score do
        nil -> 0
        _ -> points_for_fixture(team_id, fixture)
      end
    end)
  end

  def points_for_fixture(team_id, fixture) do
    score_difference = fixture.home_team_score - fixture.away_team_score
    is_home_team = fixture.home_team_id == team_id

    case { score_difference, is_home_team } do
      { 0, _ } -> 1
      { score_difference, true } when score_difference > 0 -> 3
      { score_difference, false } when score_difference < 0 -> 3
      _ -> 0
    end
  end

  def points_for_teams( weeks ) do
    first_week = hd(weeks)
    fixtures = first_week.fixtures
    team_ids = Enum.reduce( fixtures, [], fn(fixture, acc ) ->
      acc ++ [ fixture.home_team_id, fixture.away_team_id ]
    end)

    points_list = Enum.map( team_ids, fn(team)->
      { team, points_for_team(team, weeks) }
    end)

    Enum.into(points_list, %{})
  end

end
