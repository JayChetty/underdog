defmodule Underdog.GroupView do
  use Underdog.Web, :view
  require Logger

  def render("index.json", %{groups: groups}) do
    %{data: render_many(groups, Underdog.GroupView, "group.json")}
  end

  def render("show.json", %{group: group}) do
    %{data: render_one(group, Underdog.GroupView, "group.json")}
  end

  def render("group.json", %{group: group}) do
    %{id: group.id,
      name: group.name,
      users: render_many(group.users, Underdog.GroupView, "user_with_predictions.json", as: :user),
      messages: render_many(group.messages, Underdog.MessageView, "message.json", as: :message)
    }
  end

  def render("user_with_predictions.json", %{user: user}) do
    Logger.warn("user predictions #{inspect user.predictions }")
    %{
      id: user.id,
      email: user.email,
      predictions: render_many(user.predictions,
        Underdog.PredictionView,
        "prediction.json",
        as: :prediction
      )
    }
  end


end
