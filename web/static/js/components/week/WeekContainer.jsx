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

  const changeWeek = ( notEqualTo, howMany, friendOnDisplay ) => {
    console.log("trying to change week")
    const index = props.displayWeekIndex
    if ( index === notEqualTo ) {
      return "No more fixtures"
    }
    let url = `/weeks/${index+howMany}`
    if(friendOnDisplay){
      url = `/weeks/${index+howMany}/users/${friendOnDisplay.id}`
    }
    browserHistory.push(url)
  }

  let weekLimit = props.noOfWeeks-1
  if(props.friendOnDisplay){
    weekLimit = props.gameWeekIndex-1
  }

  return(
    <Swipeable
      className="layout-flex layout-flex-direction-column layout-justify-flex-space-between"
      onSwipedRight={ () => { changeWeek( 0, -1, props.friendOnDisplay ) } }
      onSwipedLeft={ () => { changeWeek( weekLimit, 1, props.friendOnDisplay ) } }
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
        friendOnDisplay={props.friendOnDisplay}
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
  const matchesInPlay = now.isAfter( endOfPredictions )
  return matchesInPlay
}

function findUser(groups, id){
  const users = _.flatten( groups.items.map( group => group.users ) )
  return users.find( user => user.id === id )
}

function mapStateToProps( state, { params } ){
  const displayWeekIndex = Number( params.id )
  const week = state.weeks.items[ displayWeekIndex ]
  const noOfWeeks = state.weeks.items.length
  const gameWeekIndex = state.predictions.gameWeekIndex

  const isGameWeek = displayWeekIndex === gameWeekIndex
  const isInPast = displayWeekIndex < gameWeekIndex
  const endOfPredictions = calcEndOfPredictions(state.weeks.items[gameWeekIndex])

  let friendOnDisplay = null
  let predictions = state.predictions.items.toJS()
  if( params.userId ){
    friendOnDisplay = findUser( state.groups, Number(params.userId) )
    predictions = friendOnDisplay.predictions
  }

  return {
    week,
    gameWeekIndex,
    isGameWeek,
    isInPast,
    displayWeekIndex,
    noOfWeeks,
    endOfPredictions,
    friendOnDisplay,
    session: state.session,
    predictions: predictions,
    matchesInPlay: calcMatchesInPlay(endOfPredictions)
  }
}

export default connect( mapStateToProps )( WeekContainer );
