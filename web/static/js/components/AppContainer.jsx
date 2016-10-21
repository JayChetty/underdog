import React from 'react'
import { connect } from 'react-redux'
import Nav from './nav/Nav'

import actions from '../actions/actions'

const AppContainer = ( { view, gameWeekIndex, children } ) => {
  return(
    <div className="app-content">
      <Nav view={ view } gameWeekIndex={ gameWeekIndex } />
      { children }
    </div>
  )
}

const mapStateToProps = (state, {params, location})=>{
  return {
    view: location.pathname.split('/')[1],
    gameWeekIndex: state.predictions.gameWeekIndex
  }
}

export default connect( mapStateToProps )( AppContainer )
