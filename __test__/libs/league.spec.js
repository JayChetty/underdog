import { findTeamById, calcPointsForTeam } from "../../web/static/js/libs/league"
import { teams } from "./__mocks__/teams"
import { weeks } from "./__mocks__/weeks"

describe( "League Module", () => {

  it( "should find team by ID", ()=> {
    expect( findTeamById( teams, 1 ) ).toEqual( {
      "name": "Arsenal",
      "image": "http://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
      "id": 1,
      "points": [0,1,3,3,3,3,3,1,1]
    })
  })

  it( "should calculate points for team", () => {
    expect( calcPointsForTeam( 2, weeks ) ).toEqual( [0,0,1,3,0,3,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] )
  })


})
