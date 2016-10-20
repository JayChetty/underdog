import React from 'react';
import { connect } from 'react-redux';
import ReactSwipe from 'react-swipe';
import _ from 'lodash';
import Fixtures from './Fixtures';
import actions from '../../actions/actions';
import FixturesSummary from './FixturesSummary';

import {  calcGameWeekIndex,
          calcPointsScoredForFixture,
          calcPointsPredictedForFixture,
          calcTotalWeekUserPoints,
          calcTotalUserPoints } from '../../libs/undergod_game'
import { calcPointsForTeam, findTeamById } from '../../libs/league'

function WeekContainer( props ) {
  if( !props.week ) { return null }

  let displayWeekIndex = props.displayWeekIndex
  if(displayWeekIndex === undefined){
    displayWeekIndex = props.gameWeekIndex
  }

  const displayWeek = props.weeks[displayWeekIndex]

  let isPreviousWeek;
  if ( displayWeek ) {
    isPreviousWeek = displayWeek.number < props.gameWeekNumber
  }

  const makePrediction = (prediction) => {
    actions.makePrediction( prediction )( props.dispatch, props.session )
  }

  const deletePrediction = (prediction) => {
    actions.deletePrediction( prediction )( props.dispatch, props.session )
  }

  // const fixtures = props.weeks.map( ( week ) => {
  //   // const fixturesWithTeams = mapTeamsToFixtures( week.fixtures, props.teams )
  //
  //   return (
  //     <main className="layout-content" key={ week.id }>
  //       <Fixtures
  //         makePrediction={ makePrediction }
  //         deletePrediction={ deletePrediction }
  //         fixtures={ week.fixtures }
  //         weekNumber={ week.number }
  //         gameWeekNumber={props.gameWeekNumber}
  //         gameWeekId={ props.gameWeekId }
  //         teams={ props.teams }
  //         predictions={ props.predictions }
  //       >
  //       </Fixtures>
  //     </main>
  //   )
  // })

  // <div>
  //   <ReactSwipe
  //     key={ fixtures.length }
  //     className="carousel"
  //     swipeOptions={{
  //       continuous: false,
  //       startSlide: displayWeekIndex,
  //       // callback: (e) => {
  //         // console.log("moving")
  //         // props.dispatch( actions.setDisplayWeek(e) )
  //       // }
  //     }}
  //   >
  //     { fixtures }
  //   </ReactSwipe>
  //   <FixturesSummary
  //     isPreviousWeek={ isPreviousWeek }
  //     totalPoints={ props.totalUserPoints }
  //     points={ () => {
  //       if ( !displayWeek ) { return "calculating points..." }
  //         return 0
  //     } }
  //   />
  // </div>

  return(
    <Fixtures
      makePrediction={ makePrediction }
      deletePrediction={ deletePrediction }
      fixtures={ props.week.fixtures }
      weekNumber={ props.week.number }
      gameWeekNumber={props.gameWeekNumber}
      gameWeekId={ props.gameWeekId }
      teams={ props.teams }
      predictions={ props.predictions }
    >
    </Fixtures>
  )
}

// function mapTeamsToFixtures( fixtures, teams ) {
//   return fixtures.map( ( fixture ) => {
//     const homeTeam = findTeamById(teams, fixture.home_team_id)
//     const awayTeam = findTeamById(teams, fixture.away_team_id)
//     return Object.assign( {}, fixture, {homeTeam: homeTeam, awayTeam:awayTeam} )
//   })
// }

function findPredictionForFixture( predictions, fixtureId ){
  return _.find( predictions, (prediction)=> prediction.fixture_id === fixtureId )
}

function mapPredictionsToFixtures( fixtures, predictions ){
  return fixtures.map( ( fixture ) => {
    const prediction = findPredictionForFixture(predictions, fixture.id)
    fixture.prediction = prediction;
    return fixture;
  });
}

// function mapPointsToTeams(teams, weeksWithFixtures){
//   return teams.map((team) => {
//     return Object.assign( {}, team, { points: calcPointsForTeam(team.id, weeksWithFixtures) } )
//   })
// }

// function mapFixturesToWeeks( weeks, fixtures ) {
//   return weeks.map( (week) => {
//     week.fixtures = fixtures.filter( (f) => { return f.week_id === week.id } )
//     return week
//   })
// }

function mapStateToProps( state, { params } ){
  // const fixturesWithPredictions = mapPredictionsToFixtures( state.fixtures.items, state.predictions.items )
  // const weeksWithFixtures = mapFixturesToWeeks( state.weeks.items, fixturesWithPredictions  )
  // const teamsWithPoints = mapPointsToTeams( state.teams.items, weeksWithFixtures)
  // const totalUserPoints = calcTotalUserPoints( state.weeks.items, teamsWithPoints )
  const gameWeekIndex = calcGameWeekIndex( state.weeks.items )
  const gameWeekId = state.weeks.items[ gameWeekIndex ] && state.weeks.items[ gameWeekIndex ].id
  const gameWeekNumber = state.weeks.items[ gameWeekIndex ] && state.weeks.items[ gameWeekIndex ].number
  const week = state.weeks.items.find( (week) => { return week.number === Number( params.id ) } )
  return {
    week,
    weeks: state.weeks.items,
    gameWeekIndex,
    gameWeekId,
    gameWeekNumber,
    // totalUserPoints,
    // teams: teamsWithPoints,
    displayWeekIndex: state.predictions.displayWeekIndex,
    session: state.session,
    predictions: state.predictions.items
  }
}

export default connect( mapStateToProps )( WeekContainer );
