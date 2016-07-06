defmodule Underdog.Repo.Migrations.CreateFixture do
  use Ecto.Migration

  def change do
    create table(:fixtures) do
      add :start_time, :datetime
      add :home_team_score, :integer
      add :away_team_score, :integer
      add :home_team_id, references(:teams, on_delete: :nothing)
      add :away_team_id, references(:teams, on_delete: :nothing)
      add :week_id, references(:weeks, on_delete: :nothing)

      timestamps
    end
    create index(:fixtures, [:home_team_id])
    create index(:fixtures, [:away_team_id])

  end
end
