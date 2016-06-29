defmodule Underdog.Week do
  use Underdog.Web, :model

  schema "weeks" do
    field :start_date, Ecto.Date
    field :number, :integer
    belongs_to :season, Underdog.Season

    timestamps
  end

  @required_fields ~w(start_date number)
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
