import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fixtures from './Fixtures';
import FixturesSummary from './FixturesSummary';
import actions from '../actions/action';
import { get } from '../rest_adapter'
import _ from 'lodash';

class PredictionBox extends Component {

  componentDidMount(){
    this.fetchData()
  }

  fetchData(){
    get("/api/seasons/1/fixtures", (data) => {
      this.props.dispatch( actions.setFixtures( data ) )
    });

    get("/api/teams", (data) => {
      this.props.dispatch( actions.setTeams( data ) )
    });

    if(this.props.session){
      get("/api/predictions", (data)=>{
        this.props.dispatch( actions.setPredictions( data ) )
      }, this.props.session);
    }
  }

  // get(url, callback){
  //   var request = new XMLHttpRequest();
  //   request.open( "GET", url );
  //   if(this.props.session){
  //     request.setRequestHeader("Authorization", this.props.session.jwt);
  //   }
  //   request.onload = () => {
  //     if( request.status === 200 ) {
  //       let receivedJson = JSON.parse( request.responseText )
  //       callback( receivedJson.data )
  //     }
  //   }
  //   request.send( null );
  // }


  findTeamById(teams, teamId){
    return _.find(teams, (team) => team.id === teamId )
  }

  findPredictionForFixture(predictions, fixtureId){
    return _.find( predictions, (prediction)=> prediction.fixture_id === fixtureId )
  }

  pointsForGame(goalDifference){
    if(goalDifference === 0){ return 1 }
    if(goalDifference > 0){ return 3 }
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

  filterFixturesByWeekId( week_id ) {
    const fixtures = this.props.fixtures.filter((fixture)=>{
      return fixture.week_id === week_id
    })
    return fixtures
  }

  calculateTotalPredictedPoints() {
    const fixtures = this.filterFixturesByWeekId( 2 )
    const points = fixtures.map( ( fixture ) => {
      if( fixture.prediction && fixture.homeTeam) {
        const pointsDifference = fixture.homeTeam.points - fixture.awayTeam.points
        return ( Math.abs( pointsDifference ) + 3 )
      }
      return 3
    })
    const total = points.reduce( ( prev, curr ) => prev + curr, 0 )
    return total
  }

  render() {
    const dummyWeekId = 2
    const fixturesForWeek = this.filterFixturesByWeekId( dummyWeekId )
    const teamsWithPoints = this.props.teams.map((team) => {
      return Object.assign( {}, team, { points: this.points(team.id) } )
    })
    const fixturesWithTeamsAndPredictions = fixturesForWeek.map((fixture) => {
      fixture.homeTeam = this.findTeamById(teamsWithPoints, fixture.home_team_id);
      fixture.awayTeam = this.findTeamById(teamsWithPoints, fixture.away_team_id);
      const prediction = this.findPredictionForFixture(this.props.predictions, fixture.id)
      fixture.prediction = prediction;
      return fixture;
    })

    return (
      <div>
        <nav className="layout-navbar">
          <div className="navbar-header">UNDER<span className="text-bold">GOD</span></div>
        </nav>
        <Fixtures fixtures={fixturesWithTeamsAndPredictions} dispatch={this.props.dispatch} session={this.props.session} />
        <FixturesSummary potentialPoints={ this.calculateTotalPredictedPoints() } />
      </div>
    )
  }

};

const mapStateToProps = ( state ) => {
  return state
}

export default connect( mapStateToProps )( PredictionBox );
