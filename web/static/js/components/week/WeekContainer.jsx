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

  const changeWeek = ( notEqualTo, howMany ) => {
    const index = props.displayWeekIndex
    if ( index === notEqualTo ) {
      return "No more fixtures"
    }
    browserHistory.push(`/weeks/${index+howMany}`)
  }

  return(
    <Swipeable
      onSwipedRight={ () => { changeWeek( 0, -1 ) } }
      onSwipedLeft={ () => { changeWeek( props.noOfWeeks-1, 1 ) } }
    >
      <Fixtures
        makePrediction={ makePrediction }
        deletePrediction={ deletePrediction }
        fixtures={ props.week.fixtures }
        weekNumber={ props.week.number }
        isGameWeek={ props.isGameWeek }
        isInPast={ props.isInPast }
        predictions={ props.predictions }
        matchesInPlay={props.inPlay}
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
  console.log('totalPredictionPoints', totalPredictionPoints)
  if( isGameWeek ){
    return 30 + totalPredictionPoints
  }
  return week.week_par + totalPredictionPoints
}

function calcMatchesInPlay(gameWeek){
  let startOfGameWeek = moment(gameWeek.fixtures[0].start_time)
  let endOfPredictions = startOfGameWeek.subtract(1, 'hours');
  let now = moment()

  return now.isAfter( endOfPredictions )
}

function mapStateToProps( state, { params } ){
  const displayWeekIndex = Number( params.id )
  const week = state.weeks.items[ displayWeekIndex ]
  const noOfWeeks = state.weeks.items.length
  const gameWeekIndex = state.predictions.gameWeekIndex

  const isGameWeek = displayWeekIndex === gameWeekIndex
  const isInPast = displayWeekIndex < gameWeekIndex

  return {
    week,
    gameWeekIndex,
    isGameWeek,
    isInPast,
    displayWeekIndex,
    noOfWeeks,
    session: state.session,
    predictions: state.predictions.items,
    matchesInPlay: calcMatchesInPlay(state.weeks.items[gameWeekIndex])
  }
}

export default connect( mapStateToProps )( WeekContainer );
