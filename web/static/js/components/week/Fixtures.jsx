import React, { Component } from 'react'
import Fixture from './Fixture'

function findTeamById(teams, teamId){
  return _.find(teams, (team) => team.id === teamId )
}

function Fixtures( { fixtures, makePrediction, gameWeekId, teams, weekNumber, gameWeekNumber } ){
  if( !fixtures ) { return null }

  const displayFixtures = fixtures.map( ( fixture ) => {
    const homeTeam = findTeamById(teams, fixture.home_team_id)
    const awayTeam = findTeamById(teams, fixture.away_team_id)
    const fixtureWithTeams = Object.assign( {}, fixture, {homeTeam: homeTeam, awayTeam:awayTeam} )
    return( <Fixture
      key={fixture.id}
      fixture={fixtureWithTeams}
      makePrediction={ makePrediction }
      isInGameWeek={gameWeekId === fixture.week_id}
      weekNumber ={weekNumber}
      gameWeekNumber={gameWeekNumber}
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
