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

  const changeWeek = ( howMany ) => {
    const weekToGoTo = displayWeekIndex+howMany
    if ( weekToGoTo >= gameWeekIndex || weekToGoTo === 0  ) {
      return "No more fixtures"
    }
    browserHistory.push(`/groups/${ group.id }/weeks/${ weekToGoTo }`)
  }

  document.body.scrollTop = 0;
  console.log("game week index", gameWeekIndex)
  return(
    <Swipeable
      className="layout-full-height layout-flex layout-flex-direction-column layout-justify-flex-space-between"
      onSwipedRight={ () => { changeWeek( -1 ) } }
      onSwipedLeft={ () => { changeWeek( 1 ) } }
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
