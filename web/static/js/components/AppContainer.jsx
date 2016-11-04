import React from 'react'
import { connect } from 'react-redux'
import Nav from './nav/Nav'
import InAppNotify from './InAppNotify';

import actions from '../actions/actions'

const AppContainer = ( { view, params, gameViewIndex, gameWeekIndex, children, notify, notificationGroup, inGroups, isSender } ) => {
  return(
    <div className="app-content layout-flex layout-flex-direction-column">
      <InAppNotify notify={ notify } inGroups={ inGroups } notificationGroup={ notificationGroup } isSender={ isSender } />
      <Nav params={ params } view={ view } gameViewIndex={ gameViewIndex } gameWeekIndex={ gameWeekIndex } />
      <main className="layout-content-footer layout-flex">
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
  const notificationGroup = findNotificationGroup( state.notify.groupId, state.groups.items )
  const view = location.pathname.split('/')[1]
  const inGroups = view === 'groups'
  let isSender = false
  if ( state.session ) {
    isSender = ( state.session.user.id === state.notify.userId )
  }
  return {
    notify: state.notify,
    notificationGroup,
    isSender,
    view,
    inGroups,
    gameWeekIndex: state.predictions.gameWeekIndex,
    gameViewIndex: Number( params.id ),
    params
  }
}

export default connect( mapStateToProps )( AppContainer )
