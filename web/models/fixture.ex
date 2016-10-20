defmodule Underdog.Fixture do
  use Underdog.Web, :model

  schema "fixtures" do
    field :start_time, Ecto.DateTime
    field :home_team_score, :integer
    field :away_team_score, :integer
    belongs_to :home_team, Underdog.Team
    belongs_to :away_team, Underdog.Team
    belongs_to :week, Underdog.Week

    timestamps
  end

  @required_fields ~w(start_time)
  @optional_fields ~w(home_team_score away_team_score)

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
