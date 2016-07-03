import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/action';
import Fixtures from './Fixtures';

class PredictionBox extends Component {

  componentDidMount() {
    console.log('predic box mounted')
    this.props.dispatch( actions.getGames() );

    var request = new XMLHttpRequest();
    var url = "/api/weeks/1/fixtures";
    request.open( "GET", url );
    request.onload = () => {
      console.log('got info', request);
      if( request.status === 200 ) {
        console.log( request.responseText )
      }
    }
    request.send( null );

  }

  render() {
    const { fixtures } = this.props
    return (
      <div>
        <h1>PredictorApp</h1>
        <Fixtures fixtures={fixtures} />
      </div>
    )
  }

};

const mapStateToProps = (state) => {
  return {
    fixtures: state
  }
}

export default connect( mapStateToProps )( PredictionBox );
