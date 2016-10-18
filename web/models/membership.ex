defmodule Underdog.Membership do
  use Underdog.Web, :model

  schema "memberships" do
    belongs_to :user, Underdog.User
    belongs_to :group, Underdog.Group

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [])
    |> validate_required([])
  end
end
