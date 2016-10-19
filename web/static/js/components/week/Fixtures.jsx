import React, { Component } from 'react'
import Fixture from './Fixture'

function Fixtures( { fixtures, makePrediction, deletePrediction, gameWeekId, teams, weekNumber, gameWeekNumber, predictions } ){
  if( !fixtures ) { return null }

  const displayFixtures = fixtures.map( ( fixture ) => {
    const prediction = predictions.find( (prediction) =>{ return prediction.fixture_id === fixture.id })
    return( <Fixture
      key={fixture.id}
      fixture={fixture}
      makePrediction={ makePrediction }
      deletePrediction={ deletePrediction }
      isInGameWeek={gameWeekId === fixture.week_id}
      weekNumber={weekNumber}
      gameWeekNumber={gameWeekNumber}
      prediction={prediction}
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
