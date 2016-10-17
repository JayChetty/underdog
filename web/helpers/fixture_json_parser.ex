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

  def name_to_symbol( name ) do
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

    symbol_map[ name ]
  end

  def minimise_fixture( fixture_map ) do
    home_team_symbol = name_to_symbol( fixture_map[ "homeTeamName" ] )
    away_team_symbol = name_to_symbol( fixture_map[ "awayTeamName" ] )
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


end
