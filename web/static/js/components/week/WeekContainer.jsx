import React from 'react';
import { connect } from 'react-redux';
import ReactSwipe from 'react-swipe';
import _ from 'lodash';
import Fixtures from './Fixtures';

function WeekContainer( props ){
  const fixtures = props.weeksWithFixtures.map( ( fixtureWeek ) => {
    return (
      <main className="layout-content" key={ fixtureWeek.id }>
        <Fixtures
          fixtures={ fixtureWeek.fixtures }
          dispatch={ props.dispatch }
          session={ props.session }>
        </Fixtures>
      </main>
    )
  })

  return(
    <div>
      <nav className="layout-navbar">
        <div className="navbar-header">UNDER<span className="text-bold">GOD</span></div>
      </nav>
      <ReactSwipe
        key={ fixtures.length }
        className="carousel"
        swipeOptions={{continuous: false, startSlide: props.gameWeek }}
      >
        { fixtures }
      </ReactSwipe>
    </div>
  )
}

function currentWeek( weekFixtures ) {
  if ( weekFixtures.length === 0 ) { return null; }

  const gameWeek = weekFixtures.findIndex( function( weekFixture, index, array ) {

    if ( index === array.length-1 ) { return true }

    const dateFrom = Date.parse( weekFixture.start_date )
    const dateTo = Date.parse( array[index+1].start_date )
    const dateToday = Date.now();

    if ( dateToday > dateFrom && dateToday < dateTo ) {
      return true;
    }

  })
  return gameWeek + 1
}

function findTeamById(teams, teamId){
  return _.find(teams, (team) => team.id === teamId )
}

function addTeamsToFixtures( fixtures, teams ){
  return fixtures.map( ( fixture ) => {
    fixture.homeTeam = findTeamById(teams, fixture.home_team_id);
    fixture.awayTeam = findTeamById(teams, fixture.away_team_id);
    return fixture;
  });
}

function addFixturesToWeeks( weeks, fixtures ) {
  return weeks.map( (week) => {
    week.fixtures = fixtures.filter( (f) => { return f.week_id === week.id } )
    return week
  })
}

function mapStateToProps( state, { params } ){
  const fixturesWithTeams = addTeamsToFixtures( state.fixtures.items, state.teams.items )
  const weekFixtures = addFixturesToWeeks( state.weeks.items, fixturesWithTeams  )
  return {
    weeksWithFixtures: weekFixtures,
    displayWeekId: 1,
    gameWeek: currentWeek( weekFixtures )
  }
}

export default connect( mapStateToProps )( WeekContainer );
