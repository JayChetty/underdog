defmodule Underdog.Team do
  use Underdog.Web, :model

  schema "teams" do
    field :name, :string
    field :image, :string

    timestamps
  end

  @required_fields ~w(name)
  @optional_fields ~w(image)

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
