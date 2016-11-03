defmodule Underdog.UserController do
  use Underdog.Web, :controller
  require Logger
  alias Underdog.User



  def update(conn, %{"id" => id, "user" => user_params}) do
    Logger.warn("IN user controller #{inspect user_params}")
    user = Repo.get!(User, id)
    changeset = User.changeset_update(user, user_params)
    Logger.warn("changeset #{inspect changeset}")
    case Repo.update(changeset) do
      {:ok, group} ->
        # render(conn, "show.json", user: user)
        send_resp(conn, :no_content, "")
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Underdog.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
