defmodule Underdog.SeasonTest do
  use Underdog.ModelCase

  alias Underdog.Season

  @valid_attrs %{start_year: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Season.changeset(%Season{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Season.changeset(%Season{}, @invalid_attrs)
    refute changeset.valid?
  end
end
