import React, { Component } from 'react'
import Fixture from './Fixture'

function findTeamById(teams, teamId){
  return _.find(teams, (team) => team.id === teamId )
}

function Fixtures( { fixtures, makePrediction, gameWeekId, teams, weekNumber } ){
  if( !fixtures ) { return null }

  console.log('rendering fixtures')
  const displayFixtures = fixtures.map( ( fixture ) => {
    console.log( fixture )
    const homeTeam = findTeamById(teams, fixture.home_team_id)
    const awayTeam = findTeamById(teams, fixture.away_team_id)
    const fixtureWithTeams = Object.assign( {}, fixture, {homeTeam: homeTeam, awayTeam:awayTeam} )
    return( <Fixture
      key={fixture.id}
      fixture={fixtureWithTeams}
      makePrediction={ makePrediction }
      isInGameWeek={gameWeekId === fixture.week_id}
      weekNumber ={weekNumber}
    />
    )
  })

  return (
    <div>
      { displayFixtures }
    </div>
  )
}

export default Fixtures
