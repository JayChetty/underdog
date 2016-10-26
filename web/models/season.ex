defmodule Underdog.Season do
  use Underdog.Web, :model

  schema "seasons" do
    field :game_week, :integer
    field :start_year, :integer
    belongs_to :league, Underdog.League
    has_many :weeks, Underdog.Week

    timestamps
  end

  @required_fields ~w(start_year)
  @optional_fields ~w(game_week)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
