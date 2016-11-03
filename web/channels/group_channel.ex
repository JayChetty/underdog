defmodule Underdog.GroupChannel do
  require Logger
  use Phoenix.Channel
  import Guardian.Phoenix.Socket
  require HTTPotion

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
    message_data = %{ group_id: group_id, body: body, user_id: user.id, user_name: user.name }
    changeset = Underdog.Message.changeset( %Underdog.Message{}, message_data )
    Underdog.Repo.insert(changeset)

    broadcast! socket, "new_msg", message_data
    #trigger broadcast to firebase for users not in app
    response = HTTPotion.post(
      "https://fcm.googleapis.com/fcm/send",
      headers: [
        "Authorization": "key=AIzaSyCc96PYoEamdZQNxh-SJDEqemTGFPhf_pM",
        "Content-Type": "application/json"
      ],
      body: "{\"to\":\"/topics/group_#{group_id}\", \"notification\": {\"title\":\"#{body}\"} }"
    )

    Logger.warn("response #{inspect response}")


    {:noreply, socket }
  end
  # def join("room:" <> _private_room_id, _params, _socket) do
  #   {:error, %{reason: "unauthorized"}}
  # end
end

#--header "Authorization: key=AIzaSyCc96PYoEamdZQNxh-SJDEqemTGFPhf_pM" --header "Content-Type: application/json" https://fcm.googleapis.com/fcm/send -d "{\"to\":\"cNWRozMIF1U:APA91bHzlqXEEG0_T1zZ_61Inyq0anuv3ZVw73kgk09OPXXD_kXH3E_QWnc1QKrtMvPTKiMxUvwDD5xGKYW1F9ijvMv6Yjqo0S2nctfkGFwXBwvn19N0sWkdD5JFI-kav4R4RNv3vrFi\", \"notification\": {\"title\": \"hello\"}}"
