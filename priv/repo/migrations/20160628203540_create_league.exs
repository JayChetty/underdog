defmodule Underdog.Repo.Migrations.CreateLeague do
  use Ecto.Migration

  def change do
    create table(:leagues) do
      add :name, :string

      timestamps
    end

  end
end
