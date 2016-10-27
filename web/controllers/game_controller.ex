defmodule Underdog.GameController do
  use Underdog.Web, :controller
  require Logger
  def index(conn, _params) do

    weeks = Repo.all(Underdog.Week)
    weeks = Repo.preload( weeks, [ { :fixtures, [ :away_team, :home_team ] } ] )
    team_points = Underdog.LeaguePointsCalculator.points_for_teams( weeks )

    user = Guardian.Plug.current_resource(conn)
    user = Repo.preload(user, [ :groups, :predictions ] )
    groups = Repo.preload( user.groups, [ { :users, :predictions }, messages: from( m in Underdog.Message, order_by: [desc: :inserted_at], limit: 50 ) ] )

    render(conn, "index.json" , [
      weeks: weeks,
      team_points: team_points,
      groups: groups,
      predictions: user.predictions
    ])
  end
end
