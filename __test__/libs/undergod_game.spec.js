import * as UG from "../../web/static/js/libs/undergod_game"
import { homeWinFixture, predictedFixture, awayWinFixture, predictedSuccessFixture } from "./__mocks__/fixtures"
import { teams } from "./__mocks__/teams"
import { week, weeks } from "./__mocks__/weeks"

describe( "Underdog Game Module", () => {

  it( "should return true for homeTeamPredictedWinner if more points than opposition", () => {
    expect( UG.isHomeTeamPredictedWinner( homeWinFixture, 6 ) ).toEqual( true )
  })

  it( "should return false for homeTeamPredictedWinner if prediction placed", () => {
    expect( UG.isHomeTeamPredictedWinner( predictedFixture, 6 ) ).toEqual( false )
  })

  it( "should return false for homeTeamPredictedWinner if less points than opposition", () => {
    expect( UG.isHomeTeamPredictedWinner( awayWinFixture, 6 ) ).toEqual( false )
  })

  it( "should calculate game points for home team", () => {
    expect( UG.calcHomeTeamPointResult( homeWinFixture, 6 ) ).toEqual( 3 )
  })

  it( "should calculate game points for away team", () => {
    expect( UG.calcAwayTeamPointResult( awayWinFixture, 6 ) ).toEqual( 3 )
  })

  it( "should score points for an expected home fixture", () => {
    expect( UG.calcPointsScoredForFixture( homeWinFixture, 6 ) ).toEqual( 3 )
  })

  it( "should score points for an expected away fixture", () => {
    expect( UG.calcPointsScoredForFixture( awayWinFixture, 6 ) ).toEqual( 3 )
  })

  it( "should score 0 points for a predicted fixture that didn't win", () => {
    expect( UG.calcPointsScoredForFixture( predictedFixture, 6 ) ).toEqual( 0 )
  })

  it( "should score 13 points for a predicted fixture that did win", () => {
    expect( UG.calcPointsScoredForFixture( predictedSuccessFixture, 6 ) ).toEqual( 13 )
  })

  it( "should calculate potential points for home win fixture", () => {
    expect( UG.calcPointsPredictedForFixture( homeWinFixture, 6 ) ).toEqual( 3 )
  })

  it( "should calculate potential points for away win fixture", () => {
    expect( UG.calcPointsPredictedForFixture( homeWinFixture, 6 ) ).toEqual( 3 )
  })

  it( "should calculate potential points for predicted upset fixture", () => {
    expect( UG.calcPointsPredictedForFixture( predictedFixture, 6 ) ).toEqual( 13 )
  })

  it( "should return the potential number of points for current week", () => {
    expect( UG.calcTotalWeekUserPoints( week, teams, { predicted: true } ) ).toEqual( 30 )
  })

  it( "should return the total number of points for all previous weeks", () => {
    expect( UG.calcTotalUserPoints( weeks, teams ) ).toEqual( 120 )
  })

})
