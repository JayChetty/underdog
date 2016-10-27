import React, { Component } from 'react'
import Fixture from './Fixture'

function Fixtures( { isGameWeek, isInPast, fixtures, makePrediction, deletePrediction, predictions, matchesInPlay } ){

  const displayFixtures = fixtures.map( ( fixture ) => {
    const prediction = predictions.find( (prediction) =>{ return prediction.fixture_id === fixture.id })
    return( <Fixture
      key={fixture.id}
      fixture={fixture}
      makePrediction={ makePrediction }
      deletePrediction={ deletePrediction }
      isGameWeek={isGameWeek}
      isInPast={ isInPast }
      prediction={prediction}
      matchesInPlay={matchesInPlay}
    />
    )
  })

  return (
    <div className="text-up text-bolder scroll-y layout-content">
      { displayFixtures }
    </div>
  )
}

export default Fixtures
