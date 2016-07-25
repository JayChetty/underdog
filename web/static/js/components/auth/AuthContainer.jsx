import React, { Component } from 'react'
import SignIn from './SignIn'
import PredictionBox from '../PredictionBox';
import { connect } from 'react-redux';

class AuthContainer extends Component {

  render() {
    let main = <h1> App </h1>
    if( !this.props.session ){
      main = <SignIn url="api/sessions"/>
    } else {
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
