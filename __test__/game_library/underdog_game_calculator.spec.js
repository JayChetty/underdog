import * as UGPoints from "../../web/static/js/game_library/undergod_game_calculator"
import { homeWinFixture, predictedFixture, awayWinFixture, predictedSuccessFixture } from "./__mocks__/fixtures"
import { teams } from "./__mocks__/teams"
import { week, weeks } from "./__mocks__/weeks"

describe( "Underdog Points Module", () => {

  it( "should return true for homeTeamPredictedWinner if more points than opposition", () => {
    expect( UGPoints.homeTeamPredictedWinner( homeWinFixture, 6 ) ).toEqual( true )
  })

  it( "should return false for homeTeamPredictedWinner if prediction placed", () => {
    expect( UGPoints.homeTeamPredictedWinner( predictedFixture, 6 ) ).toEqual( false )
  })

  it( "should return false for homeTeamPredictedWinner if less points than opposition", () => {
    expect( UGPoints.homeTeamPredictedWinner( awayWinFixture, 6 ) ).toEqual( false )
  })

  it( "should calculate game points for home team", () => {
    expect( UGPoints.homeTeamPointResult( homeWinFixture, 6 ) ).toEqual( 3 )
  })

  it( "should calculate game points for away team", () => {
    expect( UGPoints.awayTeamPointResult( awayWinFixture, 6 ) ).toEqual( 3 )
  })

  it( "should score points for an expected home fixture", () => {
    expect( UGPoints.pointsScoredForFixture( homeWinFixture, 6 ) ).toEqual( 3 )
  })

  it( "should score points for an expected away fixture", () => {
    expect( UGPoints.pointsScoredForFixture( awayWinFixture, 6 ) ).toEqual( 3 )
  })

  it( "should score 0 points for a predicted fixture that didn't win", () => {
    expect( UGPoints.pointsScoredForFixture( predictedFixture, 6 ) ).toEqual( 0 )
  })

  it( "should score 13 points for a predicted fixture that did win", () => {
    expect( UGPoints.pointsScoredForFixture( predictedSuccessFixture, 6 ) ).toEqual( 13 )
  })

  it( "should calculate potential points for home win fixture", () => {
    expect( UGPoints.pointsPredictedForFixture( homeWinFixture, 6 ) ).toEqual( 3 )
  })

  it( "should calculate potential points for away win fixture", () => {
    expect( UGPoints.pointsPredictedForFixture( homeWinFixture, 6 ) ).toEqual( 3 )
  })

  it( "should calculate potential points for predicted upset fixture", () => {
    expect( UGPoints.pointsPredictedForFixture( predictedFixture, 6 ) ).toEqual( 13 )
  })

  it( "should return the potential number of points for current week", () => {
    expect( UGPoints.totalWeekUserPoints( week, teams, { predicted: true } ) ).toEqual( 30 )
  })

  it( "should return the total number of points for all previous weeks", () => {
    expect( UGPoints.totalUserPoints( weeks, teams ) ).toEqual( 120 )
  })

})
