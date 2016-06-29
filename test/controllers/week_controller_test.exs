defmodule Underdog.WeekControllerTest do
  use Underdog.ConnCase

  alias Underdog.Week
  @valid_attrs %{number: 42, start_date: "2010-04-17"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, week_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    week = Repo.insert! %Week{}
    conn = get conn, week_path(conn, :show, week)
    assert json_response(conn, 200)["data"] == %{"id" => week.id,
      "start_date" => week.start_date,
      "number" => week.number,
      "season_id" => week.season_id}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, week_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, week_path(conn, :create), week: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Week, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, week_path(conn, :create), week: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    week = Repo.insert! %Week{}
    conn = put conn, week_path(conn, :update, week), week: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Week, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    week = Repo.insert! %Week{}
    conn = put conn, week_path(conn, :update, week), week: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    week = Repo.insert! %Week{}
    conn = delete conn, week_path(conn, :delete, week)
    assert response(conn, 204)
    refute Repo.get(Week, week.id)
  end
end
