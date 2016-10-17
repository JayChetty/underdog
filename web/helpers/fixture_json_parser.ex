defmodule Underdog.FixtureJsonParser do
  require Logger
  require Poison

  def parse_fixture(fixture_json_file) do
    Poison.decode!(fixture_json_file)
  end

  def filter_fields( api_map ) do
    {result, _} = Map.split(api_map, [
      "homeTeamName",
      "awayTeamName",
      "result",
      "matchday",
      "status"
    ])
    result
  end

  def team_api_names_to_symbol do
    symbol_map = %{
      "Hull City FC" => :hull,
      "Leicester City FC" => :leicester,
      "Southampton FC" => :southampton,
      "Watford FC" => :watford,
      "Middlesbrough FC" => :middlesbrough,
      "Stoke City FC" => :stoke,
      "Everton FC" => :everton,
      "Tottenham Hotspur FC" => :tottenham,
      "Crystal Palace FC" => :crystal_palace,
      "West Bromwich Albion FC" => :west_brom,
      "Burnley FC" => :burnley,
      "Swansea City FC" => :swansea,
      "Manchester City FC" => :man_city,
      "Sunderland AFC" => :sunderland,
      "AFC Bournemouth" => :bournemouth,
      "Manchester United FC" => :man_utd,
      "Arsenal FC" => :arsenal,
      "Liverpool FC" => :liverpool,
      "Chelsea FC" => :chelsea,
      "West Ham United FC" => :west_ham
    }
  end

  def api_name_to_symbol( name ) do
    team_api_names_to_symbol[ name ]
  end

  def minimise_fixture( fixture_map ) do
    home_team_symbol = api_name_to_symbol( fixture_map[ "homeTeamName" ] )
    away_team_symbol = api_name_to_symbol( fixture_map[ "awayTeamName" ] )
    {
      home_team_symbol,
      away_team_symbol,
      fixture_map[ "result" ][ "goalsHomeTeam" ],
      fixture_map[ "result" ][ "goalsAwayTeam" ],
    }
  end

  def parse_fixtures( fixtures_json_file ) do
    Poison.decode!( fixtures_json_file )
  end

  def minimise_fixtures( fixtures_list ) do
    weeks = %{}
    Enum.reduce( fixtures_list, weeks, fn(fixture, acc)->
      minimised_fixture = minimise_fixture( fixture )

      Dict.update(acc, fixture["matchday"], [ minimised_fixture ], fn(fixtures)->
        [ minimised_fixture | fixtures  ]
      end)
    end)
  end

  def api_name_to_name( api_name ) do
    symbol = api_name_to_symbol( api_name )
    team_data = team_symbol_to_data[symbol]
    elem(team_data, 0)
  end

  def team_symbol_to_data do
    %{
      arsenal: {"Arsenal", "http://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg"},
      bournemouth: {"Bournemouth", "https://upload.wikimedia.org/wikipedia/de/4/41/Afc_bournemouth.svg"},
      burnley: {"Burnley","http://upload.wikimedia.org/wikipedia/de/thumb/4/49/FC_Burnley.svg/376px-FC_Burnley.svg.png"},
      chelsea: {"Chelsea", "http://upload.wikimedia.org/wikipedia/de/5/5c/Chelsea_crest.svg"},
      crystal_palace: {"Crystal Palace", "http://upload.wikimedia.org/wikipedia/de/b/bf/Crystal_Palace_F.C._logo_(2013).png"},
      everton: {"Everton", "http://upload.wikimedia.org/wikipedia/de/f/f9/Everton_FC.svg"},
      hull: {"Hull City", "http://upload.wikimedia.org/wikipedia/de/a/a9/Hull_City_AFC.svg"},
      leicester: {"Leicester City","http://upload.wikimedia.org/wikipedia/en/6/63/Leicester02.png"},
      liverpool: {"Liverpool", "http://upload.wikimedia.org/wikipedia/de/0/0a/FC_Liverpool.svg"},
      man_city: {"Man City", "http://upload.wikimedia.org/wikipedia/de/f/fd/ManCity.svg"},
      man_utd: {"Man Utd", "http://upload.wikimedia.org/wikipedia/de/d/da/Manchester_United_FC.svg"},
      middlesbrough: {"Middlesbrough", "https://upload.wikimedia.org/wikipedia/en/3/34/Middlesbrough_crest.png"},
      southampton: {"Southampton", "http://upload.wikimedia.org/wikipedia/de/c/c9/FC_Southampton.svg"},
      stoke: {"Stoke City", "http://upload.wikimedia.org/wikipedia/de/a/a3/Stoke_City.svg"},
      sunderland: {"Sunderland", "http://upload.wikimedia.org/wikipedia/de/6/60/AFC_Sunderland.svg"},
      swansea: {"Swansea", "http://upload.wikimedia.org/wikipedia/de/a/ab/Swansea_City_Logo.svg"},
      tottenham: {"Tottenham", "http://upload.wikimedia.org/wikipedia/de/b/b4/Tottenham_Hotspur.svg"},
      watford: {"Watford", "https://upload.wikimedia.org/wikipedia/en/e/e2/Watford.svg"},
      west_brom: {"West Brom","http://upload.wikimedia.org/wikipedia/de/8/8b/West_Bromwich_Albion.svg"},
      west_ham: {"West Ham", "http://upload.wikimedia.org/wikipedia/de/e/e0/West_Ham_United_FC.svg"}
    }
  end


end
