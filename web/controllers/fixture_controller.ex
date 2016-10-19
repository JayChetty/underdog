defmodule Underdog.FixtureController do
  require Logger
  use Underdog.Web, :controller

  alias Underdog.Fixture

  plug :scrub_params, "fixture" when action in [:create, :update]

  defp fixtures_query( %{"week_id" => week_id} ) do
    from f in Fixture,
      where: f.week_id == ^week_id
  end

  defp fixtures_query( %{"season_id" => season_id} ) do
    from f in Fixture,
      join: w in Underdog.Week,
      where:
        w.id == f.week_id and w.season_id == ^season_id
  end

  defp fixtures_query(params) do
    Fixture
  end


  def index(conn, params) do
    Logger.debug "Logging this text! #{ inspect params["week_id"]}"
    fixtures = Repo.all( fixtures_query( params ) )
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

  # def play(conn, %{"fixture_id" => fixture_id}) do
  #   Logger.warn("HIT IT LIKE THIS YO #{inspect fixture_id}")
  #   send_resp(conn, :no_content, "")
  # end

  def delete_prediction(conn, %{"fixture_id" => fixture_id}) do
    user = Guardian.Plug.current_resource(conn)
    prediction = Repo.get_by(Underdog.Prediction, [user_id: user.id, fixture_id: fixture_id])
    Repo.delete!(prediction)
    send_resp(conn, :no_content, "")
  end
end
