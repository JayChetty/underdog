defmodule Underdog.Repo do
  use Ecto.Repo, otp_app: :underdog

  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "underdog",
  pool_size: 10
end
