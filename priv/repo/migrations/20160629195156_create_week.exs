defmodule Underdog.Repo.Migrations.CreateWeek do
  use Ecto.Migration

  def change do
    create table(:weeks) do
      add :start_date, :date
      add :number, :integer
      add :season_id, references(:seasons, on_delete: :nothing)

      timestamps
    end
    create index(:weeks, [:season_id])

  end
end
