defmodule Underdog.GroupController do
  use Underdog.Web, :controller
  require Logger
  alias Underdog.Group

  def index(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    user = Repo.preload(user, :groups)
    groups = Repo.preload( user.groups, [ { :users, :predictions }, messages: from( m in Underdog.Message, order_by: [desc: :inserted_at], limit: 50 ) ] )

    render(conn, "index.json", groups: groups)

    # groups = Repo.all(Group)
    # groups = Repo.preload( groups, [ { :users, :predictions } ] )
    # render(conn, "index.json", groups: groups)
  end

  def create(conn, %{"group" => group_params}) do
    changeset = Group.changeset(%Group{}, group_params)

    case Repo.insert(changeset) do
      {:ok, group} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", group_path(conn, :show, group))
        |> render("show.json", group: group)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Underdog.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    group = Repo.get!(Group, id)
    render(conn, "show.json", group: group)
  end

  def update(conn, %{"id" => id, "group" => group_params}) do
    group = Repo.get!(Group, id)
    changeset = Group.changeset(group, group_params)

    case Repo.update(changeset) do
      {:ok, group} ->
        render(conn, "show.json", group: group)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Underdog.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    group = Repo.get!(Group, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(group)

    send_resp(conn, :no_content, "")
  end
end
