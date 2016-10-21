import React from 'react';
import { connect } from 'react-redux';
import Swipeable from 'react-swipeable';
import _ from 'lodash';
import Fixtures from './Fixtures';
import actions from '../../actions/actions';
import FixturesSummary from './FixturesSummary';
import { browserHistory } from 'react-router';
import moment from 'moment';

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
        inPlay={props.inPlay}
      >
      </Fixtures>
      <FixturesSummary
        isInPast={ props.isInPast }
        weeklyPoints={ calcPointsForWeek(props.week, props.predictions,props.isGameWeek) }
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

function calcIsInPlay(gameWeek){
  let startOfGameWeek = moment(gameWeek.fixtures[0].start_time)
  let endOfPredictions = startOfGameWeek.subtract(1, 'hours');
  let now = moment()

  return now.isAfter( endOfPredictions )
}

function mapStateToProps( state, { params } ){
  const displayWeekIndex = Number( params.id )
  const week = state.weeks.items[ displayWeekIndex ]
  const gameWeekIndex = state.predictions.gameWeekIndex

  const isGameWeek = displayWeekIndex === gameWeekIndex
  const isInPast = displayWeekIndex < gameWeekIndex

  return {
    week,
    gameWeekIndex,
    isGameWeek,
    isInPast,
    displayWeekIndex,
    session: state.session,
    predictions: state.predictions.items,
    inPlay: calcIsInPlay(state.weeks.items[gameWeekIndex])
  }
}

export default connect( mapStateToProps )( WeekContainer );
