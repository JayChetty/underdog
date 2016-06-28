defmodule Underdog.LeagueController do
  use Underdog.Web, :controller

  alias Underdog.League

  plug :scrub_params, "league" when action in [:create, :update]

  def index(conn, _params) do
    leagues = Repo.all(League)
    render(conn, "index.json", leagues: leagues)
  end

  def create(conn, %{"league" => league_params}) do
    changeset = League.changeset(%League{}, league_params)

    case Repo.insert(changeset) do
      {:ok, league} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", league_path(conn, :show, league))
        |> render("show.json", league: league)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Underdog.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    league = Repo.get!(League, id)
    render(conn, "show.json", league: league)
  end

  def update(conn, %{"id" => id, "league" => league_params}) do
    league = Repo.get!(League, id)
    changeset = League.changeset(league, league_params)

    case Repo.update(changeset) do
      {:ok, league} ->
        render(conn, "show.json", league: league)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Underdog.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    league = Repo.get!(League, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(league)

    send_resp(conn, :no_content, "")
  end
end
