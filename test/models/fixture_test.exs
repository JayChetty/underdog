defmodule Underdog.FixtureTest do
  use Underdog.ModelCase

  alias Underdog.Fixture

  @valid_attrs %{start_time: "2010-04-17 14:00:00"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Fixture.changeset(%Fixture{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Fixture.changeset(%Fixture{}, @invalid_attrs)
    refute changeset.valid?
  end
end
