defmodule Underdog.Endpoint do
  use Phoenix.Endpoint, otp_app: :underdog

  socket "/socket", Underdog.UserSocket

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.
  plug Plug.Static,
    at: "/", from: :underdog, gzip: false,
    only: ~w(css fonts images js favicon.ico robots.txt sw.js manifest.json firebase-messaging-sw.js)

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  plug Plug.Session,
    store: :cookie,
    key: "_underdog_key",
    signing_salt: "PY+Ja1b0"

  plug Corsica, origins: "http://localhost:8000",
    allow_headers: ["Content-Type", "Authorization"],
    allow_credentials: true

  plug Underdog.Router
end
