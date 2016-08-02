import React, { Component } from 'react'
import SignIn from './SignIn'
import PredictionBox from '../PredictionBox';
import { connect } from 'react-redux';
import actions from '../../actions/actions';

class AuthContainer extends Component {

  getCachedSession(){
    return localStorage.getItem('ud_session');
  }

  render() {
    let main = <h1> Fetching Data </h1>
    const dispatch = this.props.dispatch

    if( !this.props.session ) {
      const cachedSession = this.getCachedSession()
      if( cachedSession ){
        dispatch( actions.addSession( JSON.parse(cachedSession) ) );
      } else {
        main = <SignIn url="api/sessions"/>
      }
    } else {
      actions.getTeams()( dispatch );
      actions.getFixtures()( dispatch );
      // actions.getPredictions()( dispatch, this.props.session );

      main = <PredictionBox />
    }
    return (
      main
    )
  }

}

export default AuthContainer

const mapStateToProps = ( state ) => {
  return { session: state.session }
}

export default connect( mapStateToProps )( AuthContainer );
