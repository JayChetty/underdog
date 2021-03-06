defmodule Underdog.Router do
  use Underdog.Web, :router

  pipeline :browser do
    plug :accepts, ["html", "json"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  # pipeline :restricted do
    # plug Guardian.Plug.VerifyHeader
    # plug Guardian.Plug.LoadResource
  # end



  # Other scopes may use custom stacks.
  scope "/api", Underdog do
    pipe_through :api

    post "/registrations", RegistrationController, :create
    post "/sessions", SessionController, :create
    delete "/sessions", SessionController, :delete

    resources "/users", UserController, except: [:new, :edit]

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
    resources "/fixtures", FixtureController, except: [:new, :edit] do
      delete "/delete_prediction", FixtureController, :delete_prediction
    end
    resources "/teams", TeamController, except: [:new, :edit]

    resources "/predictions", PredictionController, except: [:new, :edit]

    resources "/groups", GroupController, except: [:new, :edit]

    resources "/messages", MessageController, except: [:new, :edit]
    resources "/memberships", MembershipController, except: [:new, :edit]

    resources "/games", GameController, only: [:index]

    get "/current_user", CurrentUserController, :show



    # scope "/", Underdog do
    #   pipe_through :restricted
    #   resources "/predictions", PredictionController, except: [:new, :edit]
    # end
  end

  scope "/", Underdog do
    pipe_through :browser # Use the default browser stack
    get "/", PageController, :index
    get "/*path", PageController, :index
  end
end
