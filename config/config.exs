# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :underdog, Underdog.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "27ruxiM4prITC1EaBt4L7SZM+AKow3lc9PBqQoflO6Q7hxBX05h/iVF28gZVtJso",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: Underdog.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false

config :guardian, Guardian,
allowed_algos: ["HS512", "HS384"],
issuer: "MyApp",
ttl: { 30, :days },
serializer: MyApp.GuardianSerializer,
secret_key: "lksjdlkjsdflkjsdf"

# config :guardian, Guardian,
#   allowed_algos: ["HS512"], # optional
#   verify_module: Guardian.JWT,  # optional
#   issuer: "MyApp",
#   ttl: { 30, :days },
#   verify_issuer: true, # optional
#   secret_key: <guardian secret key>,
#   serializer: MyApp.GuardianSerializer
