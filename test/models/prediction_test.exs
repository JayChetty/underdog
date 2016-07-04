defmodule Underdog.PredictionTest do
  use Underdog.ModelCase

  alias Underdog.Prediction

  @valid_attrs %{type: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Prediction.changeset(%Prediction{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Prediction.changeset(%Prediction{}, @invalid_attrs)
    refute changeset.valid?
  end
end
