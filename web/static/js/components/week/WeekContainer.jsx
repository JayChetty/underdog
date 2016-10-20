import React from 'react';
import { connect } from 'react-redux';
import Swipeable from 'react-swipeable';
import _ from 'lodash';
import Fixtures from './Fixtures';
import actions from '../../actions/actions';
import FixturesSummary from './FixturesSummary';
import { browserHistory } from 'react-router';

import { calcGameWeekIndex } from '../../libs/undergod_game'

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
        //matchdayNumber={props.week.matchdayNumber}
        //gameWeekId={ props.week.id }
        predictions={ props.predictions }
      >
      </Fixtures>
    </Swipeable>
  )
}

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

function mapStateToProps( state, { params } ){
  const displayWeekIndex = Number( params.id )
  const week = state.weeks.items[ displayWeekIndex ]
  const gameWeekIndex = state.predictions.gameWeekIndex

  const isGameWeek = displayWeekIndex === gameWeekIndex ? true: false
  console.log( isGameWeek )
  console.log( "displayWeekIndex", displayWeekIndex )
  console.log( "gameWeekIndex", gameWeekIndex )

  //
  // const gameWeekId = state.weeks.items[ gameWeekIndex ] && state.weeks.items[ gameWeekIndex ].id
  // const matchdayNumber = state.weeks.items[ gameWeekIndex ] && state.weeks.items[ gameWeekIndex ].number
  return {
    week,
    gameWeekIndex,
    isGameWeek,
    // gameWeekId,
    // matchdayNumber,
    displayWeekIndex,
    session: state.session,
    predictions: state.predictions.items
  }
}

export default connect( mapStateToProps )( WeekContainer );
