import _ from "lodash"

const initialState = {
  isFetching: false,
  received: false,
  items: []
}

export default ( state = initialState, action ) => {

  switch ( action.type ) {
    case "UPDATE_FIXTURES_IN_WEEKS":
      const newFixtures = state.items[ action.gameWeekIndex ].fixtures.map( ( fixture ) => {
        const isMatchingFixture = _.find( action.fixtures, ( newFixture ) => { return newFixture.fixture_id === fixture.id } )
        if ( isMatchingFixture ) {
          return Object.assign( {}, fixture, { home_team_score: isMatchingFixture.home_team_score, away_team_score: isMatchingFixture.away_team_score } )
        }
        return fixture
      })
      const newWeek = Object.assign( {}, state.items[ action.gameWeekIndex ], { fixtures: newFixtures } )
      const newWeeks = Object.assign( {}, state, { items: state.items.slice( 0, action.gameWeekIndex ).concat( newWeek ).concat( state.items.slice( action.gameWeekIndex+1, action.gameWeekIndex.length ) ) } )
      return newWeeks
    case 'REQUEST_WEEKS':
      return Object.assign( {}, state, { isFetching: true })
    case 'RECEIVE_WEEKS':
      return Object.assign( {}, state, { isFetching: false, received: true, items: action.weeks } )
    default:
      return state
  }

}
