import React, { Component } from 'react'
// import SignIn from './SignIn'
import SignUp from './SignUp'

import WeekContainer from '../week/WeekContainer';
import { connect } from 'react-redux';
import actions from '../../actions/actions';

class AuthContainer extends Component {

  getCachedSession(){
    return localStorage.getItem('ud_session');
  }

  render() {
    let main = <h1> Fetching Data </h1>
    console.log("AUTH CONTAINER")
    const dispatch = this.props.dispatch

    if( !this.props.session ) {
      const cachedSession = this.getCachedSession()
      if( cachedSession ){
        dispatch( actions.addSession( JSON.parse(cachedSession) ) );
      } else {
        main = <SignUp url="api/sessions"/>
      }
    } else {
      main = <WeekContainer />
    }
    return (
      main
    )
  }

}

// export default AuthContainer

const mapStateToProps = ( state ) => {
  return { session: state.session }
}

export default connect( mapStateToProps )( AuthContainer );
