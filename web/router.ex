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

    post "/registrations", RegistrationController, :create
    resources "/predictions", PredictionController, except: [:new, :edit]

    resources "/leagues", LeagueController, except: [:new, :edit] do
      resources "/seasons", SeasonController, except: [:new, :edit]
    end
    resources "/seasons", SeasonController, except: [:new, :edit] do
      resources "/weeks", WeekController, except: [:new, :edit]
      resources "/fixtures", FixtureController, except: [:new, :edit]
    end
    resources "/weeks", WeekController, except: [:new, :edit] do
      resources "/fixtures", FixtureController, except: [:new, :edit]
    end
    resources "/fixtures", FixtureController, except: [:new, :edit]
    resources "/teams", TeamController, except: [:new, :edit]

  end
end
