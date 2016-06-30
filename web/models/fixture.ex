defmodule Underdog.Fixture do
  use Underdog.Web, :model

  schema "fixtures" do
    field :start_time, Ecto.DateTime
    belongs_to :home_team, Underdog.HomeTeam
    belongs_to :away_team, Underdog.AwayTeam

    timestamps
  end

  @required_fields ~w(start_time)
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
