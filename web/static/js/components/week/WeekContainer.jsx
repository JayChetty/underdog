import React from 'react';
import { connect } from 'react-redux';
import ReactSwipe from 'react-swipe';
import _ from 'lodash';
import Fixtures from './Fixtures';
import actions from '../../actions/actions';
import FixturesSummary from './FixturesSummary';

import { pointsScoredForFixture, pointsPredictedForFixture } from '../../game_library/points_calculator'

function WeekContainer( props ) {

  let displayWeekIndex = props.displayWeekIndex
  if(displayWeekIndex === undefined){
    displayWeekIndex = props.gameWeekIndex
  }

  const displayWeek = props.weeksWithFixtures[displayWeekIndex]

  let isPreviousWeek;
  if ( displayWeek ) {
    isPreviousWeek = displayWeek.number < props.gameWeekNumber
  }

  const makePrediction = (prediction, fixture) => {
    actions.makePrediction( prediction, fixture )( props.dispatch, props.session )
  }

  const fixtures = props.weeksWithFixtures.map( ( fixtureWeek ) => {
    return (
      <main className="layout-content" key={ fixtureWeek.id }>
        <Fixtures
          makePrediction={ makePrediction }
          fixtures={ fixtureWeek.fixtures }
          weekNumber={ fixtureWeek.number }
          gameWeekNumber={props.gameWeekNumber}
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
        swipeOptions={{
          continuous: false,
          startSlide: displayWeekIndex,
          callback: (e) => {
            props.dispatch( actions.setDisplayWeek(e) )
          }
        }}
      >
        { fixtures }
      </ReactSwipe>
      <FixturesSummary
        isPreviousWeek={ isPreviousWeek }
        points={ () => {
          if ( !displayWeek ) { return "calculating points..." }
          return totalPoints( displayWeek, props.teams, { predicted: !isPreviousWeek } )
        } }
      />
    </div>
  )
}

function findTeamById(teams, teamId){
  return _.find(teams, (team) => team.id === teamId )
}

function totalPoints( week, teams, options ) {
  const pointsForFixtures = week.fixtures.map((fixture)=>{
    const homeTeam = findTeamById(teams, fixture.home_team_id)
    const awayTeam = findTeamById(teams, fixture.away_team_id)
    const fixtureWithTeams = Object.assign( {}, fixture, {homeTeam: homeTeam, awayTeam:awayTeam} )
    if(options.predicted){
      return pointsPredictedForFixture(fixtureWithTeams, week.number)
    }
    return pointsScoredForFixture(fixtureWithTeams, week.number)
  })
  return _.sum(pointsForFixtures)
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
  const gameWeekNumber = state.weeks.items[ gameWeekIndex ] && state.weeks.items[ gameWeekIndex ].number
  return {
    weeksWithFixtures: fixtureWeeks,
    teams: teamsWithPoints,
    gameWeekIndex: gameWeekIndex,
    gameWeekId: gameWeekId,
    gameWeekNumber: gameWeekNumber,
    displayWeekIndex: state.predictions.displayWeekIndex,
    session: state.session,
    predictions: state.predictions
  }
}

export default connect( mapStateToProps )( WeekContainer );
