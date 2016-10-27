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
      className="layout-full-height layout-flex layout-flex-direction-column layout-justify-flex-space-between"
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
        matchesInPlay={props.matchesInPlay}
      >
      </Fixtures>
      <FixturesSummary
        isInPast={ props.isInPast }
        weeklyPoints={ calcPointsForWeek( props.week, props.predictions, props.isGameWeek && !props.matchesInPlay ) }
        endOfPredictions={props.endOfPredictions}
        isGameWeek={ props.isGameWeek }
        matchesInPlay={props.matchesInPlay}
      >
      </FixturesSummary>
    </Swipeable>
  )
}

function calcPointsForWeek( week, predictions, predicting ){
  const upsetPoints = predictions.map((prediction)=>{
    const fixture = week.fixtures.find( (fixture)=>{
      return fixture.id === prediction.fixture_id
    })
    if(!fixture){
      return 0
    }
    if(predicting){
      return fixture.predicted_upset_modifier
    }else{
      return fixture.upset_modifier
    }

  })
  const totalPredictionPoints = _.sum(upsetPoints)
  if( predicting ){
    return 30 + totalPredictionPoints
  }
  return week.week_par + totalPredictionPoints
}

function calcEndOfPredictions(gameWeek){
  let startOfGameWeek = moment(gameWeek.fixtures[0].start_time)
  let endOfPredictions = startOfGameWeek.subtract(1, 'hours');
  return endOfPredictions
}

function calcMatchesInPlay(endOfPredictions){
  let now = moment()
  // let now = moment("2016-10-29 17:00Z")
  const matchesInPlay = now.isAfter( endOfPredictions )
  return matchesInPlay
}

function mapStateToProps( state, { params } ){
  const displayWeekIndex = Number( params.id )
  const week = state.weeks.items[ displayWeekIndex ]
  const noOfWeeks = state.weeks.items.length
  const gameWeekIndex = state.predictions.gameWeekIndex

  const isGameWeek = displayWeekIndex === gameWeekIndex
  const isInPast = displayWeekIndex < gameWeekIndex

  const endOfPredictions = calcEndOfPredictions(state.weeks.items[gameWeekIndex])

  return {
    week,
    gameWeekIndex,
    isGameWeek,
    isInPast,
    displayWeekIndex,
    noOfWeeks,
    endOfPredictions,
    session: state.session,
    predictions: state.predictions.items.toJS(),
    matchesInPlay: calcMatchesInPlay(endOfPredictions)
  }
}

export default connect( mapStateToProps )( WeekContainer );
