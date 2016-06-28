ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Underdog.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Underdog.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Underdog.Repo)

