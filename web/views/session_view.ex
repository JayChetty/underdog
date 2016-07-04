defmodule Underdog.SessionView do
  use Underdog.Web, :view

  def render("show.json", %{jwt: jwt, user: user}) do
    %{
      jwt: jwt,
      user: user
    }
  end

  def render("error.json", _) do
    %{error: "Invalid email or password"}
  end

  def render("forbidden.json", _) do
      %{error: "No Permission"}
  end
end
