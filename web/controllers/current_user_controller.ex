defmodule Underdog.CurrentUserController do
  use Underdog.Web, :controller
  require Logger

  plug Guardian.Plug.EnsureAuthenticated, handler: Underdog.SessionController

  def show(conn, _) do
    user = Guardian.Plug.current_resource(conn)
    Logger.debug "user #{user}"
    conn
    |> put_status(:ok)
    |> render("show.json", user: user)
  end
end
