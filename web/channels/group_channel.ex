defmodule Underdog.GroupChannel do
  require Logger
  use Phoenix.Channel

  def join("group:lobby", _message, socket) do
    {:ok, socket}
  end

  def handle_in("new_msg", %{"body" => body}, socket) do
    Logger.debug "Got message! #{ inspect body }"
    broadcast! socket, "new_msg", %{body: body}
    {:noreply, socket}
  end
  # def join("room:" <> _private_room_id, _params, _socket) do
  #   {:error, %{reason: "unauthorized"}}
  # end
end
