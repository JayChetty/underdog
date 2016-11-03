defmodule Underdog.UserController do
  use Underdog.Web, :controller
  require Logger
  alias Underdog.User

  def update(conn, %{"user" => user_params}) do
    #Note we don't use the id passed in
    #We get user from session, protecting anyone being able to change anyone
    user = Guardian.Plug.current_resource(conn)
    changeset = User.changeset_update(user, user_params)
    case Repo.update(changeset) do
      {:ok, group} ->
        send_resp(conn, :no_content, "")
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Underdog.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
