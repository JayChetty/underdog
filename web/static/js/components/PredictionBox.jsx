import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/action';
import Fixtures from './Fixtures';
import _ from 'lodash';

class PredictionBox extends Component {

  findTeamById(teams, teamId){
    return _.find(teams, (team)=> team.id === teamId )
  }

  pointsForGame(goalDifference){
    if(goalDifference === 0){ return 1}
    if(goalDifference > 0){return 3}
    return 0
  }

  pointsForFixtureType(teamId, isHomeTeam = true){
    let fixtureType = "home_team"
    if(!isHomeTeam){
      fixtureType = "away_team"
    }
    const fixtures = this.props.fixtures.filter((fixture)=>{
      return fixture[fixtureType + '_id'] === teamId
    })

    const points = fixtures.reduce((totalPoints, fixture)=>{
      if(fixture["home_team_score"] === null){//game not completed don't add points
        return totalPoints + 0
      }
      let goalDifference = fixture["home_team_score"] - fixture["away_team_score"]
      if( !isHomeTeam ){
        goalDifference = goalDifference * -1
      }
      return totalPoints + this.pointsForGame(goalDifference)
    },0)
    return points
  }


  points(teamId){
    return this.pointsForFixtureType(teamId) + this.pointsForFixtureType(teamId, false)
  }

  render() {
    // const { fixtures } = this.props
    const dummyWeekId =2
    const fixturesForWeek = this.props.fixtures.filter((fixture)=>{
      return fixture.week_id === dummyWeekId
    })
    const teamsWithPoints = this.props.teams.map((team)=>{
      return Object.assign( {}, team, { points: this.points(team.id) } )
    })
    const fixturesWithTeams = fixturesForWeek.map((fixture)=>{
      fixture.homeTeam = this.findTeamById(teamsWithPoints, fixture.home_team_id);
      fixture.awayTeam = this.findTeamById(teamsWithPoints, fixture.away_team_id);
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
