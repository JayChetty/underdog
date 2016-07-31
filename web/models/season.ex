defmodule Underdog.Season do
  use Underdog.Web, :model

  schema "seasons" do
    field :start_year, :integer
    belongs_to :league, Underdog.League
    has_many :weeks, Underdog.Week

    timestamps
  end

  @required_fields ~w(start_year)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
