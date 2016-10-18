defmodule Underdog.Repo.Migrations.CreateMembership do
  use Ecto.Migration

  def change do
    create table(:memberships) do
      add :user_id, references(:users, on_delete: :nothing)
      add :group_id, references(:groups, on_delete: :nothing)

      timestamps()
    end
    create index(:memberships, [:user_id])
    create index(:memberships, [:group_id])

  end
end
