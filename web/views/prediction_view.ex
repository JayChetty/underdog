defmodule Underdog.PredictionView do
  use Underdog.Web, :view

  def render("index.json", %{predictions: predictions}) do
    %{data: render_many(predictions, Underdog.PredictionView, "prediction.json")}
  end

  def render("show.json", %{prediction: prediction}) do
    %{data: render_one(prediction, Underdog.PredictionView, "prediction.json")}
  end

  def render("prediction.json", %{prediction: prediction}) do
    %{id: prediction.id,
      user_id: prediction.user_id,
      fixture_id: prediction.fixture_id,
      type: prediction.type}
  end
end
