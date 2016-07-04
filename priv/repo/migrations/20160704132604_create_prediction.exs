defmodule Underdog.Repo.Migrations.CreatePrediction do
  use Ecto.Migration

  def change do
    create table(:predictions) do
      add :type, :string
      add :user_id, references(:users, on_delete: :nothing)
      add :fixture_id, references(:fixtures, on_delete: :nothing)

      timestamps
    end
    create index(:predictions, [:user_id])
    create index(:predictions, [:fixture_id])

  end
end
