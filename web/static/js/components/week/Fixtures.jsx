import React, { Component } from 'react'
import Fixture from './Fixture'

function Fixtures( { fixtures, makePrediction, gameWeekId, teams, weekNumber, gameWeekNumber } ){
  if( !fixtures ) { return null }

  const displayFixtures = fixtures.map( ( fixture ) => {
    return( <Fixture
      key={fixture.id}
      fixture={fixture}
      makePrediction={ makePrediction }
      isInGameWeek={gameWeekId === fixture.week_id}
      weekNumber={weekNumber}
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
