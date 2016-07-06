import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/action';
import Fixtures from './Fixtures';
import _ from 'lodash';

class PredictionBox extends Component {

  findTeamById(teamId){
    return _.find(this.props.teams, (team)=> team.id === teamId )
  }

  render() {
    const fixturesWithTeams = this.props.fixtures.map((fixture)=>{
      fixture.homeTeam = this.findTeamById(fixture.home_team_id);
      fixture.awayTeam = this.findTeamById(fixture.away_team_id);
      return fixture;
    })
    return (
      <div>
        <nav className="navbar">
          <div className="navbar-header">UNDERDOG</div>
        </nav>
        <Fixtures fixtures={fixturesWithTeams} />
      </div>
    )
  }

};

const mapStateToProps = ( state ) => {
  return state
}

export default connect( mapStateToProps )( PredictionBox );
