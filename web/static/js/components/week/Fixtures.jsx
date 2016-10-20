import React, { Component } from 'react'
import Fixture from './Fixture'

function Fixtures( { isGameWeek, fixtures, makePrediction, deletePrediction, predictions } ){

  const displayFixtures = fixtures.map( ( fixture ) => {
    const prediction = predictions.find( (prediction) =>{ return prediction.fixture_id === fixture.id })
    return( <Fixture
      key={fixture.id}
      fixture={fixture}
      makePrediction={ makePrediction }
      deletePrediction={ deletePrediction }
      isGameWeek={isGameWeek}
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
