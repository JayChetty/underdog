defmodule Underdog.Message do
  use Underdog.Web, :model

  schema "messages" do
    field :body, :string
    belongs_to :group, Underdog.Group
    belongs_to :user, Underdog.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:body, :group_id, :user_id])
    |> validate_required([:body, :group_id, :user_id])
  end
end
