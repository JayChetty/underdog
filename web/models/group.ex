defmodule Underdog.Group do
  use Underdog.Web, :model

  schema "groups" do
    field :name, :string
    has_many :memberships, Underdog.Membership
    has_many :users, through: [:memberships, :user]

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name])
    |> validate_required([:name])
  end
end
