defmodule Underdog.Repo.Migrations.CreateSeason do
  use Ecto.Migration

  def change do
    create table(:seasons) do
      add :start_year, :integer
      add :league_id, references(:leagues, on_delete: :nothing)

      timestamps
    end
    create index(:seasons, [:league_id])

  end
end
