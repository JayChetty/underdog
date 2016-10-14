import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactSwipe from 'react-swipe';
import Fixtures from './Fixtures';
import FixturesSummary from './FixturesSummary';
import actions from '../actions/actions';
import _ from 'lodash';

class PredictionBox extends Component {

  componentDidMount(){
    this.fetchData()
  }

  // fetchData(){
  //   const dispatch = this.props.dispatch;
  //   actions.getWeeks()( dispatch );
  //   actions.getFixtures()( dispatch );
  //   actions.getTeams()( dispatch );
  //   if(this.props.session){
  //      actions.getPredictions()( dispatch, this.props.session );
  //   }
  // }

  findTeamById(teams, teamId){
    return _.find(teams, (team) => team.id === teamId )
  }

  findPredictionForFixture( predictions, fixtureId ){
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
    const fixtures = this.props.fixtures.items.filter((fixture)=>{
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
    const fixtures = this.props.fixtures.items.filter((fixture)=>{
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

  fixturesWithTeamsAndPredictions() {
    const teamsWithPoints = this.props.teams.items.map((team) => {
      return Object.assign( {}, team, { points: this.points(team.id) } )
    })
    return this.props.fixtures.items.map( ( fixture ) => {
      fixture.homeTeam = this.findTeamById(teamsWithPoints, fixture.home_team_id);
      fixture.awayTeam = this.findTeamById(teamsWithPoints, fixture.away_team_id);
      const prediction = this.findPredictionForFixture(this.props.predictions.items, fixture.id)
      fixture.prediction = prediction;
      return fixture;
    });
  }

  weeksWithFixtures( fixtures ) {
    return this.props.weeks.items.map( (week) => {
      week.fixtures = fixtures.filter( (f) => { return f.week_id === week.id } )
      return week
    })
  }

  render() {
    const fixtureWeeks = this.weeksWithFixtures( this.fixturesWithTeamsAndPredictions() );
    const fixtures = fixtureWeeks.map( ( fixtureWeek ) => {
      return (
        <main className="layout-content" key={ fixtureWeek.id }>
          <Fixtures
            fixtures={ fixtureWeek.fixtures }
            dispatch={ this.props.dispatch }
            session={this.props.session}>
          </Fixtures>
        </main>
      )
    })

    return (
      <div>
        <nav className="layout-navbar">
          <div className="navbar-header">UNDER<span className="text-bold">GOD</span></div>
        </nav>
        <ReactSwipe key={ fixtures.length } className="carousel" swipeOptions={{continuous: false}}>
          { fixtures }
        </ReactSwipe>
        <FixturesSummary potentialPoints={ this.calculateTotalPredictedPoints() } />
      </div>
    )
  }

};

const mapStateToProps = ( state ) => {
  return state
}

export default connect( mapStateToProps )( PredictionBox );
