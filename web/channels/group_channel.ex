defmodule Underdog.GroupChannel do
  require Logger
  use Phoenix.Channel
  import Guardian.Phoenix.Socket
  require HTTPotion

  # def join("group:lobby", _message, socket) do
  #   {:ok, socket}
  # end

  def join("group:" <> group_id, _params, socket) do
    Logger.warn "trying to join GROUP socket#{ inspect socket}"
    user = Guardian.Phoenix.Socket.current_resource(socket)
    Logger.warn "trying to join GROUP user#{ inspect user}"
    {:ok, socket}
  end

  def handle_in("new_msg", %{"body" => body, "group_id" => group_id}, socket) do
    Logger.warn "GOT MESSAGE #{ inspect group_id}"
    user = Guardian.Phoenix.Socket.current_resource(socket)
    Logger.warn "GOT MESSAGE USER #{ inspect user}"
    message_data = %{ group_id: group_id, body: body, user_id: user.id, user_name: user.name }
    broadcast! socket, "new_msg", message_data

    changeset = Underdog.Message.changeset( %Underdog.Message{}, message_data )
    Underdog.Repo.insert(changeset)

    #trigger broadcast to firebase for users not in app
    group = Underdog.Repo.get!(Underdog.Group, group_id)
    broadcast_firebase_group_message(group_id, group.name, body, user.name)

    {:noreply, socket }
  end

  def handle_in("add_member", %{"email" => email, "group_id" => group_id}, socket) do
    Logger.warn "GOT MEMBER MESSAGE #{ inspect group_id }"
    user_to_add = Underdog.Repo.get_by(Underdog.User, email: email)
    Logger.warn "Adding User #{ inspect user_to_add }"

    case user_to_add do
      nil ->
        nil
        push socket, "error_adding_member", %{}

      _ ->
        membership= Underdog.Membership.changeset( %Underdog.Membership{}, %{user_id: user_to_add.id, group_id: group_id } )
        case Underdog.Repo.insert(membership) do
          {:ok, membership} ->
            push socket, "member_added", %{membership: membership.id}
            # broadcast! socket, "new_msg", message_data
          {:error, changeset} ->
            push socket, "error_adding_member", %{}
        end


    end
    {:noreply, socket }
  end


  # def join("room:" <> _private_room_id, _params, _socket) do
  #   {:error, %{reason: "unauthorized"}}
  # end
  def broadcast_firebase_group_message(group_id, group_name, text, username) do
    # host = "https://guarded-hollows-82324.herokuapp.com"
    # # host = "localhost:4000"
    #
    # http_body = %{
    #   to: "/topics/group_#{group_id}",
    #   collapse_key: "group_#{group_id}",
    #   notification: %{
    #     title: "#{username} @ #{group_name}",
    #     body: text,
    #     click_action: "#{host}/groups/#{group_id}/chat",
    #     icon: "/images/main_icon/underdog-152.png"
    #   }
    # }
    #
    # System.get_env( "FCM_SERVER_KEY" )
    # response = HTTPotion.post(
    #   "https://fcm.googleapis.com/fcm/send",
    #   headers: [
    #     "Authorization": "key=#{System.get_env( "FCM_SERVER_KEY" )}",
    #     "Content-Type": "application/json"
    #   ],
    #   body: Poison.encode!( http_body )
    # )
    #
    # Logger.warn("response #{inspect response}")
    broadcast_firebase_topic_message(
      "group_#{group_id}",
      "#{username} @ #{group_name}",
      text,
      "groups/#{group_id}/chat",
      "group_#{group_id}"
    )
  end

  def broadcast_firebase_topic_message(topic, title, body, click_action, collapse_key) do
    host = "https://guarded-hollows-82324.herokuapp.com"
    # host = "localhost:4000"

    http_body = %{
      to: "/topics/#{topic}",
      collapse_key: collapse_key,
      notification: %{
        title: title,
        body: body,
        click_action: "FCM_PLUGIN_ACTIVITY",
        icon: "/images/main_icon/underdog-152.png"
      },
      data: %{
        params: "value"
      },
      priority: "high"
    }

    System.get_env( "FCM_SERVER_KEY" )
    response = HTTPotion.post(
      "https://fcm.googleapis.com/fcm/send",
      headers: [
        "Authorization": "key=#{System.get_env( "FCM_SERVER_KEY" )}",
        "Content-Type": "application/json"
      ],
      body: Poison.encode!( http_body )
    )

    Logger.warn("response #{inspect response}")
  end
end

#--header "Authorization: key=AIzaSyCc96PYoEamdZQNxh-SJDEqemTGFPhf_pM" --header "Content-Type: application/json" https://fcm.googleapis.com/fcm/send -d "{\"to\":\"cNWRozMIF1U:APA91bHzlqXEEG0_T1zZ_61Inyq0anuv3ZVw73kgk09OPXXD_kXH3E_QWnc1QKrtMvPTKiMxUvwDD5xGKYW1F9ijvMv6Yjqo0S2nctfkGFwXBwvn19N0sWkdD5JFI-kav4R4RNv3vrFi\", \"notification\": {\"title\": \"hello\"}}"
