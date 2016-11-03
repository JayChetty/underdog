defmodule Underdog.Repo.Migrations.AddFirebaseTokenToUsers do
  use Ecto.Migration

  def change do
    alter table( :users ) do
      add :firebase_token, :string
    end
  end
end
