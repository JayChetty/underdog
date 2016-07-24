import React, { Component } from 'react'

import SignIn from './SignIn'
import PredictionBox from '../PredictionBox';
import { connect } from 'react-redux';
// import { Provider } from 'react-redux';
import actions from '../../actions/action';

class AuthContainer extends Component {

  getCachedSession(){
    return localStorage.getItem('ud_session');
  }

  render() {
    let main = <h1> Fetching Data </h1>

    if( !this.props.session ){
      const cachedSession = this.getCachedSession()
      if( cachedSession ){
        this.props.dispatch( actions.addSession( JSON.parse(cachedSession) ) );
      }else{
        main = <SignIn url="api/sessions"/>
      }
    }else{
      main = <PredictionBox />
    }
    return (
      main
    )
  }

}

export default AuthContainer

const mapStateToProps = ( state ) => {
  return state
}

export default connect( mapStateToProps )( AuthContainer );
