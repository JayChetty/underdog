import React from 'react'
import { connect } from 'react-redux'
import Nav from './nav/Nav'
import InAppNotify from './InAppNotify';
import FooterNav from './nav/FooterNav';

import actions from '../actions/actions'

const AppContainer = ( { view, numberOfWeeks, params, gameViewIndex, gameWeekIndex, children, notify, notificationGroup, inGroups, isSender, displayWeekIndex } ) => {
  return(
    <div className="app-content layout-flex layout-flex-direction-column">
      <InAppNotify notify={ notify } inGroups={ inGroups } notificationGroup={ notificationGroup } isSender={ isSender } />
      <Nav numberOfWeeks={ numberOfWeeks } params={ params } view={ view } gameViewIndex={ gameViewIndex } gameWeekIndex={ gameWeekIndex } displayWeekIndex={ displayWeekIndex } />
      <main className="layout-flex">
        { children }
      </main>
      <FooterNav gameWeekIndex={ gameWeekIndex } view={ view } />
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
  return {
    numberOfWeeks,
    notify: state.notify,
    displayWeekIndex,
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
