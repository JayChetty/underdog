defmodule Underdog.PredictionController do
  use Underdog.Web, :controller
  require Logger

  alias Underdog.Prediction
  # plug Guardian.Plug.EnsureAuthenticated, handler: Underdog.SessionController

  plug :scrub_params, "prediction" when action in [:create, :update]

  def index(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    user = Repo.preload(user, :predictions)
    render(conn, "index.json", predictions: user.predictions)
  end

  def create(conn, %{"prediction" => prediction_params}) do
    user = Guardian.Plug.current_resource(conn)
    Logger.warn "user #{ inspect user }"
    prediction = Ecto.build_assoc( user, :predictions)
    changeset = Prediction.changeset(prediction, prediction_params)

    case Repo.insert(changeset) do
      {:ok, prediction} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", prediction_path(conn, :show, prediction))
        |> render("show.json", prediction: prediction)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Underdog.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id, "fixture_id" => fixture_id}) do
    Logger.warn "delete #{inspect id}"
    # prediction = Repo.get!(Prediction, id)
    # Logger.warn "prediction #{inspect prediction}"
    # # Here we use delete! (with a bang) because we expect
    # # it to always work (and if it does not, it will raise).
    # Repo.delete!(prediction)

    send_resp(conn, :no_content, "")
  end

  def show(conn, %{"id" => id}) do
    prediction = Repo.get!(Prediction, id)
    render(conn, "show.json", prediction: prediction)
  end

  def update(conn, %{"id" => id, "prediction" => prediction_params}) do
    prediction = Repo.get!(Prediction, id)
    changeset = Prediction.changeset(prediction, prediction_params)

    case Repo.update(changeset) do
      {:ok, prediction} ->
        render(conn, "show.json", prediction: prediction)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Underdog.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    Logger.warn "delete #{inspect id}"
    prediction = Repo.get!(Prediction, id)
    Logger.warn "prediction #{inspect prediction}"
    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(prediction)

    send_resp(conn, :no_content, "")
  end






  def delete(conn, %{"id" => id, "fixture_id" => fixture_id}) do
    Logger.warn "delete #{inspect id}"
    # prediction = Repo.get!(Prediction, id)
    # Logger.warn "prediction #{inspect prediction}"
    # # Here we use delete! (with a bang) because we expect
    # # it to always work (and if it does not, it will raise).
    # Repo.delete!(prediction)

    send_resp(conn, :no_content, "")
  end
end
