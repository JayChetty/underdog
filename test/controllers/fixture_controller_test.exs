defmodule Underdog.FixtureControllerTest do
  use Underdog.ConnCase

  alias Underdog.Fixture
  @valid_attrs %{start_time: "2010-04-17 14:00:00"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, fixture_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    fixture = Repo.insert! %Fixture{}
    conn = get conn, fixture_path(conn, :show, fixture)
    assert json_response(conn, 200)["data"] == %{"id" => fixture.id,
      "start_time" => fixture.start_time,
      "home_team_id" => fixture.home_team_id,
      "away_team_id" => fixture.away_team_id}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, fixture_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, fixture_path(conn, :create), fixture: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Fixture, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, fixture_path(conn, :create), fixture: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    fixture = Repo.insert! %Fixture{}
    conn = put conn, fixture_path(conn, :update, fixture), fixture: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Fixture, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    fixture = Repo.insert! %Fixture{}
    conn = put conn, fixture_path(conn, :update, fixture), fixture: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    fixture = Repo.insert! %Fixture{}
    conn = delete conn, fixture_path(conn, :delete, fixture)
    assert response(conn, 204)
    refute Repo.get(Fixture, fixture.id)
  end
end
