import React from 'react'
import { connect } from 'react-redux';
import Swipeable from 'react-swipeable';
import Fixtures from '../week/Fixtures';
import { browserHistory } from 'react-router';

const GroupPredictions = ( { week, group, gameWeekIndex, displayWeekIndex } ) => {

  const changeWeek = ( limit, howMany ) => {
    const index = displayWeekIndex
    if ( index === limit ) {
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
