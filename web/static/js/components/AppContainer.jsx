import React from 'react'
import { connect } from 'react-redux'
import Aside from './nav/Aside'
import InAppNotify from './InAppNotify';
import Nav from './nav/Nav';

import actions from '../actions/actions'

const AppContainer = ( { view, inGroup, inGroupChat, numberOfWeeks, params, gameViewIndex, gameWeekIndex, children, notify, notificationGroup, inGroups, isSender, displayWeekIndex } ) => {
  // let footer = null;
  //
  // if ( !inGroup ) {
  //   footer =
  // }

  return(
    <div className="app-content layout-flex layout-flex-direction-column">
      <InAppNotify notify={ notify } inGroups={ inGroups } inGroupChat={ inGroupChat } notificationGroup={ notificationGroup } isSender={ isSender } />
      <Nav gameWeekIndex={ gameWeekIndex } view={ view } inGroup={ inGroup } />
      <Aside numberOfWeeks={ numberOfWeeks } params={ params } view={ view } gameViewIndex={ gameViewIndex } gameWeekIndex={ gameWeekIndex } displayWeekIndex={ displayWeekIndex } />
      <main>
        { children }
      </main>
    </div>
  )
}

const findNotificationGroup = ( groupId, groups ) => {
  const notificationGroup = groups.find( ( group ) => { return groupId === group.id } )
  if ( notificationGroup ) {
    return notificationGroup.name
  }
  return null;
}

const mapStateToProps = (state, {params, location})=>{
  const displayWeekIndex = Number( params.id )
  const numberOfWeeks = state.weeks.items.length;
  const notificationGroup = findNotificationGroup( state.notify.groupId, state.groups.items )
  const view = location.pathname.split('/')[1]
  const inGroups = view === 'groups'
  let isSender = false
  if ( state.session ) {
    isSender = ( state.session.user.id === state.notify.userId )
  }
  const inGroup = location.pathname !== '/groups' && inGroups
  const inGroupChat = location.pathname.split('/')[3] === 'chat'
  return {
    numberOfWeeks,
    notify: state.notify,
    displayWeekIndex,
    notificationGroup,
    isSender,
    inGroupChat,
    view,
    inGroups,
    inGroup,
    gameWeekIndex: state.predictions.gameWeekIndex,
    gameViewIndex: Number( params.id ),
    params
  }
}

export default connect( mapStateToProps )( AppContainer )
