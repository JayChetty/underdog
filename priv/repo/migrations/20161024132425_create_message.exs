defmodule Underdog.Repo.Migrations.CreateMessage do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :body, :string
      add :group_id, references(:groups, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end
    create index(:messages, [:group_id])
    create index(:messages, [:user_id])

  end
end
