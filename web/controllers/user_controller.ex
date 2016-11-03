defmodule Underdog.UserController do
  use Underdog.Web, :controller
  require Logger
  alias Underdog.User

  def update(conn, %{"user" => user_params}) do
    #Note we don't use the id passed in
    #We get user from session, protecting anyone being able to change anyone
    user = Guardian.Plug.current_resource(conn)
    user = Repo.preload(user, [ :groups ] )
    changeset = User.changeset_update(user, user_params)
    case Repo.update(changeset) do
      {:ok, user} ->
        subscribe_to_topics( user )
        send_resp(conn, :no_content, "")
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Underdog.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def subscribe_to_topics(user) do
    Enum.each(user.groups, fn( group )->
      subscribe_to_topic( user.firebase_token, group.id )
    end)
  end

  def subscribe_to_topic(firebase_token, group_id)do
    url = "https://iid.googleapis.com/iid/v1/#{firebase_token}/rel/topics/group_#{group_id}"
    Logger.warn("trying to join group #{inspect url}")
    response = HTTPotion.post(
      url,
      headers: [
        "Authorization": "key=AIzaSyCc96PYoEamdZQNxh-SJDEqemTGFPhf_pM",
        "Content-Type": "application/json"
      ]
    )
    Logger.warn("response #{inspect response}")
  end
end
