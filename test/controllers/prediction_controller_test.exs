defmodule Underdog.PredictionControllerTest do
  use Underdog.ConnCase

  alias Underdog.Prediction
  @valid_attrs %{type: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, prediction_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    prediction = Repo.insert! %Prediction{}
    conn = get conn, prediction_path(conn, :show, prediction)
    assert json_response(conn, 200)["data"] == %{"id" => prediction.id,
      "user_id" => prediction.user_id,
      "fixture_id" => prediction.fixture_id,
      "type" => prediction.type}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, prediction_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, prediction_path(conn, :create), prediction: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Prediction, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, prediction_path(conn, :create), prediction: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    prediction = Repo.insert! %Prediction{}
    conn = put conn, prediction_path(conn, :update, prediction), prediction: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Prediction, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    prediction = Repo.insert! %Prediction{}
    conn = put conn, prediction_path(conn, :update, prediction), prediction: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    prediction = Repo.insert! %Prediction{}
    conn = delete conn, prediction_path(conn, :delete, prediction)
    assert response(conn, 204)
    refute Repo.get(Prediction, prediction.id)
  end
end
