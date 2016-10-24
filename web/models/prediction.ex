defmodule Underdog.Prediction do
  use Underdog.Web, :model

  schema "predictions" do
    field :type, :string
    belongs_to :user, Underdog.User
    belongs_to :fixture, Underdog.Fixture

    timestamps
  end

  @required_fields ~w(user_id fixture_id type)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> unique_constraint(:user_id_predicition_id)
  end
end
