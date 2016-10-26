defmodule Underdog.Repo.Migrations.AddFieldsToSeasons do
  use Ecto.Migration

  def change do
    alter table( :seasons ) do
      add :game_week, :integer
    end
  end
end
