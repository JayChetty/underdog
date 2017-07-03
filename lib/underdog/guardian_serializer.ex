defmodule Underdog.GuardianSerializer do
  @behaviour Guardian.Serializer

  alias Underdog.{Repo, User}
  #added comment
  #another comment

  def for_token(user = %User{}), do: { :ok, "User:#{user.id}" }
  def for_token(_), do: { :error, "Unknown resource type" }

  def from_token("User:" <> id), do: { :ok, Repo.get(User, String.to_integer(id)) }
  def from_token(_), do: { :error, "Unknown resource type" }
end
#
# defmodule MyApp.GuardianSerializer do
#   @behaviour Guardian.Serializer
#
#   alias MyApp.Repo
#   alias MyApp.User
#
#   def for_token(user = %User{}), do: { :ok, "User:#{user.id}" }
#   def for_token(_), do: { :error, "Unknown resource type" }
#
#   def from_token("User:" <> id), do: { :ok, Repo.get(User, id) }
#   def from_token(_), do: { :error, "Unknown resource type" }
# end
