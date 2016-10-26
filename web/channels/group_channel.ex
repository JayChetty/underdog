defmodule Underdog.GroupChannel do
  require Logger
  use Phoenix.Channel
  import Guardian.Phoenix.Socket

  # def join("group:lobby", _message, socket) do
  #   {:ok, socket}
  # end

  def join("group:" <> group_id, _params, socket) do
    user = Guardian.Phoenix.Socket.current_resource(socket)
    Logger.warn "user #{inspect user}"
    Logger.warn "Connecting to group #{inspect group_id}"
    {:ok, socket}
  end

  def handle_in("new_msg", %{"body" => body, "group_id" => group_id}, socket) do
    user = Guardian.Phoenix.Socket.current_resource(socket)
    Logger.debug "in user! #{ inspect user}"
    Logger.debug "Got message! #{ inspect body }"
    message_data = %{ group_id: group_id, body: body, user_id: user.id }
    changeset = Underdog.Message.changeset( %Underdog.Message{}, message_data )
    Underdog.Repo.insert(changeset)

    broadcast! socket, "new_msg", message_data
    {:noreply, socket }
  end
  # def join("room:" <> _private_room_id, _params, _socket) do
  #   {:error, %{reason: "unauthorized"}}
  # end
end
