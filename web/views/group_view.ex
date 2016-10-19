defmodule Underdog.GroupView do
  use Underdog.Web, :view

  def render("index.json", %{groups: groups}) do
    %{data: render_many(groups, Underdog.GroupView, "group.json")}
  end

  def render("show.json", %{group: group}) do
    %{data: render_one(group, Underdog.GroupView, "group.json")}
  end

  def render("group.json", %{group: group}) do
    %{id: group.id,
      name: group.name,
      users: render_many(group.users, Underdog.GroupView, "user_with_predictions.json", as: :user)
    }
  end

  def render("user_with_predictions.json", %{user: user}) do
    %{
      id: user.id,
      email: user.email,
      predictions: user.predictions
    }
  end
end
