import React from 'react';
import { connect } from 'react-redux';
import Swipeable from 'react-swipeable';
import _ from 'lodash';
import Fixtures from './Fixtures';
import actions from '../../actions/actions';
import FixturesSummary from './FixturesSummary';
import { browserHistory } from 'react-router';

function WeekContainer( props ) {

  const makePrediction = ( prediction ) => {
    actions.makePrediction( prediction )( props.dispatch, props.session )
  }

  const deletePrediction = ( prediction ) => {
    actions.deletePrediction( prediction )( props.dispatch, props.session )
  }

  const swipeShowWeekNext = ( event ) => {
    browserHistory.push(`/weeks/${props.displayWeekIndex+1}`)
  }

  const swipeShowWeekPrev = ( event ) => {
    browserHistory.push(`/weeks/${props.displayWeekIndex-1}`)
  }

  const isGameWeek = props.week.number === props.matchdayNumber

  return(
    <Swipeable
      onSwipedRight={ swipeShowWeekPrev }
      onSwipedLeft={ swipeShowWeekNext }
    >
      <Fixtures
        makePrediction={ makePrediction }
        deletePrediction={ deletePrediction }
        fixtures={ props.week.fixtures }
        weekNumber={ props.week.number }
        isGameWeek={ props.isGameWeek }
        isInPast={ props.isInPast }
        predictions={ props.predictions }
      >
      </Fixtures>
      <FixturesSummary
        isPreviousWeek={ props.week.number < props.matchdayNumber }
        weeklyPoints={ calcPointsForWeek(props.week, props.predictions,isGameWeek) }
      />
    </Swipeable>
  )
}
function calcPointsForWeek( week, predictions, isGameWeek ){

  const upsetPoints = predictions.map((prediction)=>{
    const fixture = week.fixtures.find( (fixture)=>{
      return fixture.id === prediction.fixture_id
    })
    if(!fixture){
      return 0
    }
    return fixture.upset_modifier
  })
  console.log('upsetpoints', upsetPoints)
  const totalPredictionPoints = _.sum(upsetPoints)
  console.log('week.week_par', week.week_par)
  let par = week.week_par
  if( isGameWeek ){
    return 30 + totalPredictionPoints
  }
  return week.week_par + totalPredictionPoints
}

function mapStateToProps( state, { params } ){
  const displayWeekIndex = Number( params.id )
  const week = state.weeks.items[ displayWeekIndex ]
  const gameWeekIndex = state.predictions.gameWeekIndex

  const isGameWeek = displayWeekIndex === gameWeekIndex
  const isInPast = displayWeekIndex < gameWeekIndex

// =======
// function findPredictionForFixture( predictions, fixtureId ){
//   return _.find( predictions, (prediction)=> prediction.fixture_id === fixtureId )
// }
//
//
// function filterPredictionsForWeek( predictions, weekId ){
//   return predictions.filter((prediction)=>{
//     return true
//     return prediction.week_id === weekId
//   })
// }
//
// function mapPredictionsToFixtures( fixtures, predictions ){
//   return fixtures.map( ( fixture ) => {
//     const prediction = findPredictionForFixture(predictions, fixture.id)
//     fixture.prediction = prediction;
//     return fixture;
//   });
// }
//
// function mapStateToProps( state, { params } ){
//   const displayWeekIndex = Number( params.id )
//   // const week = state.weeks.items[ displayWeekIndex ] && state.weeks.items[ displayWeekIndex - 1]
//   const gameWeekIndex = calcGameWeekIndex( state.weeks.items )
//   const gameWeekId = state.weeks.items[ gameWeekIndex ] && state.weeks.items[ gameWeekIndex ].id
//   const matchdayNumber = state.weeks.items[ gameWeekIndex ] && state.weeks.items[ gameWeekIndex ].number
//   const week = state.weeks.items.find( (week) => { return week.number === displayWeekIndex } )
// >>>>>>> b0552b6cd115c022291c5a6d71a62b3bcbfa4035
  return {
    week,
    gameWeekIndex,
    isGameWeek,
    isInPast,
    displayWeekIndex,
    session: state.session,
    predictions: state.predictions.items
  }
}

export default connect( mapStateToProps )( WeekContainer );
