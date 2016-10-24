defmodule Underdog.MessageView do
  use Underdog.Web, :view

  def render("index.json", %{messages: messages}) do
    %{data: render_many(messages, Underdog.MessageView, "message.json")}
  end

  def render("show.json", %{message: message}) do
    %{data: render_one(message, Underdog.MessageView, "message.json")}
  end

  def render("message.json", %{message: message}) do
    %{id: message.id,
      group_id: message.group_id,
      user_id: message.user_id,
      body: message.body}
  end
end
