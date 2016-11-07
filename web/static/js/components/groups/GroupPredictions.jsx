import React from 'react'
import { connect } from 'react-redux';
import Swipeable from 'react-swipeable';
import Fixtures from '../week/Fixtures';
import { browserHistory } from 'react-router';
import moment from 'moment';


//DUPLICATED PUT IN LIBRARY
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


const GroupPredictions = ( { week, group, gameWeekIndex, displayWeekIndex } ) => {

  const changeWeek = ( limit, howMany ) => {

    let index = displayWeekIndex

    if(calcMatchesInPlay( calcEndOfPredictions(week) ) ){
      limit++;
    }

    if ( index >= limit ) {
      return "No more fixtures"
    }

    browserHistory.push(`/groups/${ group.id }/weeks/${ index+howMany }`)
  }

  return(
    <Swipeable
      className="layout-full-height layout-flex layout-flex-direction-column layout-justify-flex-space-between"
      onSwipedRight={ () => { changeWeek( 0, -1 ) } }
      onSwipedLeft={ () => { changeWeek( gameWeekIndex-1, 1 ) } }
    >
      <Fixtures
        className="layout-content-no-footer"
        fixtures={ week.fixtures }
        weekNumber={ week.number }
        groupUsers={ group.users }
        isInPast={ true }
        isGameWeek={ false }
      >
      </Fixtures>
    </Swipeable>
  )

}

const mapStateToProps = ( state, { params } ) => {
  const group = state.groups.items.find((group)=>{
    return group.id === Number(params.groupId)
  })
  const gameWeekIndex = state.predictions.gameWeekIndex
  const displayWeekIndex = Number( params.displayWeekIndex )
  return {
    gameWeekIndex: gameWeekIndex,
    week: state.weeks.items[displayWeekIndex],
    displayWeekIndex,
    group
  }
}

export default connect(mapStateToProps)( GroupPredictions )
