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
          weekNumber={ fixtureWeek.number }
          gameWeekId={ props.gameWeekId}
          teams={ props.teams}
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


function pointsForGame(fixture, teamId){
  const homeTeamWon = fixture.home_team_score > fixture.away_team_score
  const awayTeamWon = fixture.away_team_score > fixture.home_team_score
  const isHomeTeam = fixture.home_team_id === teamId
  const isAwayTeam = fixture.away_team_id === teamId
  if( !isHomeTeam && !isAwayTeam){return false}

  if( (isHomeTeam && homeTeamWon) || (isAwayTeam && awayTeamWon) ){
    return 3
  }
  if( (isHomeTeam && awayTeamWon) || (isAwayTeam && homeTeamWon) ){
    return 0
  }

  return 1
}

function calculatePoints(teamId, weeks){
  return weeks.map((week)=>{
    const teamFixture = week.fixtures.find((fixture)=>{
      return fixture.home_team_id === teamId || fixture.away_team_id === teamId
    })
    return pointsForGame(teamFixture, teamId)
  })
}

//END POINTS CALCULATING LIBRARY
function findPredictionForFixture( predictions, fixtureId ){
  return _.find( predictions, (prediction)=> prediction.fixture_id === fixtureId )
}

function addPredictionsToFixtures( fixtures, predictions  ){
  return fixtures.map( ( fixture ) => {
    const prediction = findPredictionForFixture(predictions, fixture.id)
    fixture.prediction = prediction;
    return fixture;
  });
}

function addPointsToTeams(teams, weeksWithFixtures){
  return teams.map((team) => {
    return Object.assign( {}, team, { points: calculatePoints(team.id, weeksWithFixtures) } )
  })
}

function addFixturesToWeeks( weeks, fixtures ) {
  return weeks.map( (week) => {
    week.fixtures = fixtures.filter( (f) => { return f.week_id === week.id } )
    return week
  })
}


function mapStateToProps( state, { params } ){
  const fixturesWithPredictions = addPredictionsToFixtures( state.fixtures.items, state.predictions.items )
  const fixtureWeeks = addFixturesToWeeks( state.weeks.items, fixturesWithPredictions  )
  const teamsWithPoints = addPointsToTeams( state.teams.items, fixtureWeeks)
  const gameWeekIndex = currentWeek( state.weeks.items )
  const gameWeekId = state.weeks.items[ gameWeekIndex ] && state.weeks.items[ gameWeekIndex ].id
  return {
    weeksWithFixtures: fixtureWeeks,
    teams: teamsWithPoints,
    gameWeekIndex: gameWeekIndex,
    gameWeekId: gameWeekId,
    session: state.session,
    predictions: state.predictions
  }
}

export default connect( mapStateToProps )( WeekContainer );
