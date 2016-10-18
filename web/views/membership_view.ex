defmodule Underdog.MembershipView do
  use Underdog.Web, :view

  def render("index.json", %{memberships: memberships}) do
    %{data: render_many(memberships, Underdog.MembershipView, "membership.json")}
  end

  def render("show.json", %{membership: membership}) do
    %{data: render_one(membership, Underdog.MembershipView, "membership.json")}
  end

  def render("membership.json", %{membership: membership}) do
    %{id: membership.id,
      user_id: membership.user_id,
      group_id: membership.group_id}
  end
end
