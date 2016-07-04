defmodule Underdog.PredictionController do
  use Underdog.Web, :controller

  alias Underdog.Prediction
  plug Guardian.Plug.EnsureAuthenticated, handler: Underdog.SessionController

  plug :scrub_params, "prediction" when action in [:create, :update]

  def index(conn, _params) do
    predictions = Repo.all(Prediction)
    render(conn, "index.json", predictions: predictions)
  end

  def create(conn, %{"prediction" => prediction_params}) do
    changeset = Prediction.changeset(%Prediction{}, prediction_params)

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
    prediction = Repo.get!(Prediction, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(prediction)

    send_resp(conn, :no_content, "")
  end
end
