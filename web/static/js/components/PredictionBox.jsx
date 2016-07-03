import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/action';
import Fixtures from './Fixtures';
import _ from 'lodash';

class PredictionBox extends Component {

  // componentDidMount() {
  //   this.props.dispatch( actions.getGames() );
  // }

  findTeamById(teamId){
    return _.find(this.props.teams, (team)=> team.id === teamId )
  }

  render() {
    // const { fixtures } = this.props
    const fixturesWithTeams = this.props.fixtures.map((fixture)=>{
      fixture.homeTeam = this.findTeamById(fixture.home_team_id);
      fixture.awayTeam = this.findTeamById(fixture.away_team_id);
      return fixture;
    })
    return (
      <div>
        <h1>PredictorApp</h1>
        <Fixtures fixtures={fixturesWithTeams} />
      </div>
    )
  }

};

const mapStateToProps = ( state ) => {
  return state
}

export default connect( mapStateToProps )( PredictionBox );
