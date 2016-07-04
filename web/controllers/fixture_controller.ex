defmodule Underdog.FixtureController do
  require Logger
  use Underdog.Web, :controller

  alias Underdog.Fixture

  plug :scrub_params, "fixture" when action in [:create, :update]

  def index(conn, _params) do
    Logger.debug "Logging this text! #{ inspect _params["week_id"]}"
    query = from f in Fixture,
      where: f.week_id == ^_params["week_id"]

    fixtures = Repo.all(query)
    render(conn, "index.json", fixtures: fixtures)
  end

  def create(conn, %{"fixture" => fixture_params}) do
    changeset = Fixture.changeset(%Fixture{}, fixture_params)

    case Repo.insert(changeset) do
      {:ok, fixture} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", fixture_path(conn, :show, fixture))
        |> render("show.json", fixture: fixture)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Underdog.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    fixture = Repo.get!(Fixture, id)
    render(conn, "show.json", fixture: fixture)
  end

  def update(conn, %{"id" => id, "fixture" => fixture_params}) do
    fixture = Repo.get!(Fixture, id)
    changeset = Fixture.changeset(fixture, fixture_params)

    case Repo.update(changeset) do
      {:ok, fixture} ->
        render(conn, "show.json", fixture: fixture)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Underdog.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    fixture = Repo.get!(Fixture, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(fixture)

    send_resp(conn, :no_content, "")
  end
end