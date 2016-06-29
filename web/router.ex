defmodule Underdog.Router do
  use Underdog.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Underdog do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index

  end

  # Other scopes may use custom stacks.
  scope "/api", Underdog do
    pipe_through :api
    resources "/leagues", LeagueController, except: [:new, :edit]
    resources "/seasons", SeasonController, except: [:new, :edit]
    resources "/weeks", WeekController, except: [:new, :edit]
  end
end
