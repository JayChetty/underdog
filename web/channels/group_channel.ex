defmodule Underdog.GroupChannel do
  require Logger
  use Phoenix.Channel

  def join("group:lobby", _message, socket) do
    {:ok, socket}
  end

  def join("group:" <> group_id, _params, socket) do
    Logger.warn "Connecting to group #{inspect group_id}"
    {:ok, socket}
  end

  def handle_in("new_msg", %{"body" => body, "group_id" => group_id}, socket) do
    Logger.debug "Previous message! #{ inspect group_id }"
    Logger.debug "Got message! #{ inspect body }"

    changeset = Underdog.Message.changeset(%Underdog.Message{}, %{ group_id: group_id, body: body, user_id: 1 })
    Underdog.Repo.insert(changeset)

    broadcast! socket, "new_msg", %{ group_id: group_id, body: body, user_id: 1 }
    {:noreply, socket }
  end
  # def join("room:" <> _private_room_id, _params, _socket) do
  #   {:error, %{reason: "unauthorized"}}
  # end
end
