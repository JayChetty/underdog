defmodule Underdog.LeagueControllerTest do
  use Underdog.ConnCase

  alias Underdog.League
  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, league_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    league = Repo.insert! %League{}
    conn = get conn, league_path(conn, :show, league)
    assert json_response(conn, 200)["data"] == %{"id" => league.id,
      "name" => league.name}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, league_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, league_path(conn, :create), league: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(League, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, league_path(conn, :create), league: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    league = Repo.insert! %League{}
    conn = put conn, league_path(conn, :update, league), league: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(League, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    league = Repo.insert! %League{}
    conn = put conn, league_path(conn, :update, league), league: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    league = Repo.insert! %League{}
    conn = delete conn, league_path(conn, :delete, league)
    assert response(conn, 204)
    refute Repo.get(League, league.id)
  end
end
