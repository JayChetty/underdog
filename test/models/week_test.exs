defmodule Underdog.WeekTest do
  use Underdog.ModelCase

  alias Underdog.Week

  @valid_attrs %{number: 42, start_date: "2010-04-17"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Week.changeset(%Week{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Week.changeset(%Week{}, @invalid_attrs)
    refute changeset.valid?
  end
end
