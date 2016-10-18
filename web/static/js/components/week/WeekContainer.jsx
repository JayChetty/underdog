import React from 'react';
import { connect } from 'react-redux';
import ReactSwipe from 'react-swipe';
import _ from 'lodash';
import Fixtures from './Fixtures';
import actions from '../../actions/actions';
import FixturesSummary from './FixturesSummary';

import { pointsScoredForFixture, pointsPredictedForFixture, totalWeekUserPoints, totalUserPoints } from '../../game_library/undergod_game_calculator'
import { calculatePoints } from '../../game_library/league_points_calculator'

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
        totalPoints={ () => { return totalUserPoints( props.weeksWithFixtures, props.teams, isPreviousWeek ) } }
        points={ () => {
          if ( !displayWeek ) { return "calculating points..." }
          return totalWeekUserPoints( displayWeek, props.teams, { predicted: !isPreviousWeek } )
        } }
      />
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
