import React from 'react'
import { connect } from 'react-redux'
import Nav from './nav/Nav'

import actions from '../actions/actions'

const AppContainer = ( props ) => {
  return(
    <div className="app-content">
      <Nav/>
      { props.children }
    </div>
  )
}

const mapStateToProps = (state, {params, location})=>{
  return {
    // siteId: params.siteId || null,
    view: location.pathname.split('/')[1]
  }
}

export default connect( mapStateToProps )( AppContainer )
