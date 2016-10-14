import actions from "../../web/static/js/actions/actions.js"

describe( "Login Actions", () => {

  it( "requests log in", () => {
    expect( actions.loginUserRequest() ).toEqual( { type: "LOGIN_USER_REQUEST" })
  })

  it( "logs in successfully", () => {
    // localStorage???
    expect( actions.loginUserSuccess( "1234" ) ).toEqual( { type: "LOGIN_USER_SUCCESS", token: "1234" } )
  })

  it( "add in session", () => {
    expect( actions.addSession( { name: "BlaBla" } ) ).toEqual( { type: "ADD_SESSION", session: { name: "BlaBla" } } )
  })

})

describe( "Fixtures & Week Actions", () => {

  it( "requests weeks", () => {
    expect( actions.requestWeeks() ).toEqual( { type: "REQUEST_WEEKS" } )
  })

  it( "receive weeks", () => {
    expect( actions.receiveWeeks( [{ week_id:3 }] ) ).toEqual( { type: "RECEIVE_WEEKS", weeks: [{ week_id:3 }] } )
  })

  it( "sets display week", () => {
    expect( actions.setDisplayWeek( 34 ) ).toEqual( { type: "SET_DISPLAY_WEEK", week: 34 } )
  })

  it( "requests teams", () => {
    expect( actions.requestTeams() ).toEqual( { type: "REQUEST_TEAMS" })
  })

  it( "receives teams", () => {
    expect( actions.receiveTeams( [{name:"Man Utd"}] ) ).toEqual( { type: "RECEIVE_TEAMS", teams: [{name:"Man Utd"}] } )
  })

  it( "requests fixtures", () => {
    expect( actions.requestFixtures() ).toEqual( { type: "REQUEST_FIXTURES" })
  })

  it( "receives fixtures", () => {
    expect( actions.receiveFixtures( [{ home_team_id:1 }] ) ).toEqual( { type: "RECEIVE_FIXTURES", fixtures: [{ home_team_id:1 }]})
  })

})
