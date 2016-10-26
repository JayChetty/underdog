defmodule Underdog.WeekController do
  use Underdog.Web, :controller

  alias Underdog.Week
  alias Underdog.Season

  plug :scrub_params, "week" when action in [:create, :update]

  def index(conn, _params) do
    weeks = Repo.all(Week)
    weeks = Repo.preload( weeks, [ { :fixtures, [ :away_team, :home_team ] } ] )
    team_points = Underdog.LeaguePointsCalculator.points_for_teams( weeks )
    seasons = Repo.all( Season )
    season = List.first( seasons )
    render(conn, "index_with_points.json" , [ weeks: weeks, team_points: team_points, game_week: season.game_week ] )

  end

  def create(conn, %{"week" => week_params}) do
    changeset = Week.changeset(%Week{}, week_params)

    case Repo.insert(changeset) do
      {:ok, week} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", week_path(conn, :show, week))
        |> render("show.json", week: week)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Underdog.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    week = Repo.get!(Week, id)
    render(conn, "show.json", week: week)
  end

  def update(conn, %{"id" => id, "week" => week_params}) do
    week = Repo.get!(Week, id)
    changeset = Week.changeset(week, week_params)

    case Repo.update(changeset) do
      {:ok, week} ->
        render(conn, "show.json", week: week)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Underdog.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    week = Repo.get!(Week, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(week)

    send_resp(conn, :no_content, "")
  end
end
