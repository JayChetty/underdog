defmodule Underdog.Repo.Migrations.AddUniquePredictionIndex do
  use Ecto.Migration

  def change do
    create unique_index(:predictions, [:user_id, :fixture_id])
  end
end
