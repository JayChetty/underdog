defmodule Underdog.User do
  require Logger
  use Underdog.Web, :model

  @derive {Poison.Encoder, only: [:id, :name, :email]}

  schema "users" do
    field :name, :string
    field :email, :string
    field :encrypted_password, :string
    field :password, :string, virtual: true
    field :firebase_token, :string
    has_many :predictions, Underdog.Prediction
    has_many :memberships, Underdog.Membership
    has_many :groups, through: [:memberships, :group]


    timestamps
  end

  @required_fields ~w(name email password)
  @optional_fields ~w(encrypted_password firebase_token)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_format(:email, ~r/@/)
    |> validate_length(:password, min: 5)
    |> validate_confirmation(:password, message: "Password does not match")
    |> unique_constraint(:email, message: "Email already taken")
    |> generate_encrypted_password
  end

  def changeset_update(model, params \\ :empty) do
    model
    |> cast(params, [:firebase_token])
  end

  defp generate_encrypted_password(current_changeset) do
    case current_changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(current_changeset, :encrypted_password, Comeonin.Bcrypt.hashpwsalt(password))
      _ ->
        current_changeset
    end
  end
end
