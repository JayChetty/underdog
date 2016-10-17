defmodule Underdog.FixtureParserTest do
  # use Underdog.ModelCase
  require Logger
  use ExUnit.Case
  alias Underdog.FixtureJsonParser

  test "can parse fixture json to a map" do
    {:ok, json_file} = File.read "test/test_fixture.json"
    fixture =  FixtureJsonParser.parse_fixture( json_file )
    assert fixture["status"] == "FINISHED"
  end

  test "filters map to required fields" do
    api_map = %{
      "_links" => %{
        "awayTeam" => %{"href" => "http://api.football-data.org/v1/teams/338"},
        "competition" => %{"href" => "http://api.football-data.org/v1/competitions/426"},
        "homeTeam" => %{"href" => "http://api.football-data.org/v1/teams/322"},
        "self" => %{"href" => "http://api.football-data.org/v1/fixtures/150841"}
      },
      "awayTeamName" => "Leicester City FC",
      "date" => "2016-08-13T11:30:00Z",
      "homeTeamName" => "Hull City FC",
      "matchday" => 1,
      "odds" => %{"awayWin" => 2.2, "draw" => 3.25, "homeWin" => 3.25},
      "result" => %{"goalsAwayTeam" => 1, "goalsHomeTeam" => 2},
      "status" => "FINISHED"
    }

    desired_map = %{
      "homeTeamName" => "Hull City FC",
      "awayTeamName" => "Leicester City FC",
      "result" => %{"goalsAwayTeam" => 1, "goalsHomeTeam" => 2},
      "matchday" => 1,
      "status" => "FINISHED"
    }

    assert desired_map == FixtureJsonParser.filter_fields( api_map )
  end

  test "give symbol of name" do
    name = "Hull City FC"
    symbol = :hull
    assert symbol == FixtureJsonParser.api_name_to_symbol( "Hull City FC" )
  end

  test "can produce a minismised fixture tuple" do
    input = %{
      "homeTeamName" => "Hull City FC",
      "awayTeamName" => "Leicester City FC",
      "result" => %{"goalsAwayTeam" => 1, "goalsHomeTeam" => 2},
      "matchday" => 1,
      "status" => "FINISHED"
    }

    out = {:hull, :leicester, 2, 1}
    assert out == FixtureJsonParser.minimise_fixture( input )
  end

  # List of teams
  test "can parse multiple fixures to a list" do
    {:ok, json_file} = File.read "test/test_fixtures.json"
    fixtures =  FixtureJsonParser.parse_fixtures( json_file )
    assert hd(fixtures)["status"] == "FINISHED"
  end


  ##Integration Test
  test "can group fixtures into weeks" do
    inputs = [
      %{
        "status" => "FINISHED",
        "matchday" => 1,
        "homeTeamName" => "Hull City FC",
        "awayTeamName" => "Leicester City FC",
        "result" => %{
          "goalsHomeTeam" => 2,
          "goalsAwayTeam" => 1
        },
      },
      %{
        "status" => "FINISHED",
        "matchday" => 1,
        "homeTeamName" => "Burnley FC",
        "awayTeamName" => "Swansea City FC",
        "result" => %{
          "goalsHomeTeam" => 0,
          "goalsAwayTeam" => 1
        },
      },
      %{
        "status" => "FINISHED",
        "matchday" => 2,
        "homeTeamName" => "Manchester United FC",
        "awayTeamName" => "Southampton FC",
        "result" => %{
          "goalsHomeTeam" => 2,
          "goalsAwayTeam" => 0
        },
      }
    ]

    target = %{
      1 => [ { :burnley, :swansea, 0, 1 }, { :hull, :leicester, 2, 1 } ],
      2 => [ { :man_utd, :southampton, 2, 0 } ]
    }

    assert target == FixtureJsonParser.minimise_fixtures( inputs )
  end

  test "can map the api name to db name" do
    assert "Man Utd" == FixtureJsonParser.api_name_to_name( "Manchester United FC")
  end






end
