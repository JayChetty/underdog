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
    </Swipeable>
  )
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
    predictions: state.predictions.items
  }
}

export default connect( mapStateToProps )( WeekContainer );
