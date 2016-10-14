import React from 'react';
import { connect } from 'react-redux';
import ReactSwipe from 'react-swipe';
import _ from 'lodash';
import Fixtures from './Fixtures';
import actions from '../../actions/actions';
import FixturesSummary from './FixturesSummary';

function WeekContainer( props ){

  const makePrediction = (prediction, fixture)=>{
    actions.makePrediction( prediction, fixture )( props.dispatch, props.session )
  }

  const fixtures = props.weeksWithFixtures.map( ( fixtureWeek ) => {
    return (
      <main className="layout-content" key={ fixtureWeek.id }>
        <Fixtures
          makePrediction={ makePrediction }
          fixtures={ fixtureWeek.fixtures }
          gameWeekId={ props.gameWeekId}
        >
        </Fixtures>
      </main>
    )
  })

  return(
    <div>
      <nav className="layout-navbar">
        <div className="navbar-header">UNDER<span className="text-bold">GOD</span></div>
      </nav>
      <ReactSwipe
        key={ fixtures.length }
        className="carousel"
        swipeOptions={{continuous: false, startSlide: props.gameWeekIndex }}
      >
        { fixtures }
      </ReactSwipe>
      <FixturesSummary potentialPoints={ calculateTotalPredictedPoints( props.weeksWithFixtures[ props.gameWeekIndex ] ) } />
    </div>
  )
}

// function createMakePrediction(dispatch){
//    return function(prediction){
//      console.log( 'prediction clicked' )
//      actions.makePrediction( prediction )( dispatch )
//    }
// }
//
// function makePrediction( prediction ) {
//   actions.makePrediction( prediction )( dispatch )
// }

function currentWeek( weekFixtures ) {
  if ( weekFixtures.length === 0 ) { return null; }

  const gameWeek = weekFixtures.findIndex( function( weekFixture, index, array ) {

    if ( index === array.length-1 ) { return true }

    const dateFrom = Date.parse( weekFixture.start_date )
    const dateTo = Date.parse( array[index+1].start_date )
    const dateToday = Date.now();

    if ( dateToday > dateFrom && dateToday < dateTo ) {
      return true;
    }

  })
  return gameWeek + 1
}

function findTeamById(teams, teamId){
  return _.find(teams, (team) => team.id === teamId )
}

//POINTS CALCULATING LIBRARY

function calculateTotalPredictedPoints( weekFixtures ) {
  if (!weekFixtures) { return 0 }


  // const weekFixtures = filterFixturesByWeekId( weekId, fixtures )
  const points = weekFixtures.fixtures.map( ( fixture ) => {
    if( fixture.prediction && fixture.homeTeam) {
      const pointsDifference = fixture.homeTeam.points - fixture.awayTeam.points
      return ( Math.abs( pointsDifference ) + 3 )
    }
    return 3
  })
  const total = points.reduce( ( prev, curr ) => prev + curr, 0 )
  return total
}

function pointsForGame(goalDifference){
  if(goalDifference === 0){ return 1 }
  if(goalDifference > 0){ return 3 }
  return 0
}

function pointsForFixtureType(fixtures, teamId, isHomeTeam = true){
  let fixtureType = "home_team"
  if(!isHomeTeam){
    fixtureType = "away_team"
  }
  const teamFixtures = fixtures.filter((fixture)=>{
    return fixture[fixtureType + '_id'] === teamId
  })

  const points = teamFixtures.reduce((totalPoints, fixture)=>{
    if(fixture["home_team_score"] === null){//game not completed don't add points
      return totalPoints + 0
    }
    let goalDifference = fixture["home_team_score"] - fixture["away_team_score"]
    if( !isHomeTeam ){
      goalDifference = goalDifference * -1
    }
    return totalPoints + pointsForGame(goalDifference)
  },0)
  return points
}


function calculatePoints(teamId, fixtures){
  return pointsForFixtureType(fixtures, teamId) + pointsForFixtureType(fixtures, teamId, false)
}

//END POINTS CALCULATING LIBRARY

function addTeamsToFixtures( fixtures, teams, predictions ){
  const teamsWithPoints = teams.map((team) => {
    return Object.assign( {}, team, { points: calculatePoints(team.id, fixtures) } )
  })

  return fixtures.map( ( fixture ) => {
    fixture.homeTeam = findTeamById(teamsWithPoints, fixture.home_team_id);
    fixture.awayTeam = findTeamById(teamsWithPoints, fixture.away_team_id);
    const prediction = findPredictionForFixture(predictions, fixture.id)
    fixture.prediction = prediction;
    return fixture;
  });
}

function addFixturesToWeeks( weeks, fixtures ) {
  return weeks.map( (week) => {
    week.fixtures = fixtures.filter( (f) => { return f.week_id === week.id } )
    return week
  })
}

function findPredictionForFixture( predictions, fixtureId ){
  return _.find( predictions, (prediction)=> prediction.fixture_id === fixtureId )
}


function mapStateToProps( state, { params } ){
  const fixturesWithTeams = addTeamsToFixtures( state.fixtures.items, state.teams.items, state.predictions.items )
  const weekFixtures = addFixturesToWeeks( state.weeks.items, fixturesWithTeams  )
  const gameWeekIndex = currentWeek( weekFixtures )
  const gameWeekId = state.weeks.items[ gameWeekIndex ] && state.weeks.items[ gameWeekIndex ].id
  return {
    weeksWithFixtures: weekFixtures,
    displayWeekId: 1,
    gameWeekIndex: gameWeekIndex,
    gameWeekId: gameWeekId,
    session: state.session,
    predictions: state.predictions
  }
}

export default connect( mapStateToProps )( WeekContainer );
