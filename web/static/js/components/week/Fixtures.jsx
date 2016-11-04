import React, { Component } from 'react'
import Fixture from './Fixture'

function Fixtures( { className, isGameWeek, isInPast, fixtures, makePrediction, deletePrediction, predictions, matchesInPlay, groupUsers } ){


  const displayFixtures = fixtures.map( ( fixture ) => {
    let prediction = null;
    if ( predictions ) {
      prediction = predictions.find( (prediction) =>{ return prediction.fixture_id === fixture.id })
    }

    return( <Fixture
      key={fixture.id}
      fixture={fixture}
      makePrediction={ makePrediction }
      deletePrediction={ deletePrediction }
      isGameWeek={isGameWeek}
      isInPast={ isInPast }
      prediction={ prediction }
      matchesInPlay={matchesInPlay}
      groupUsers={ groupUsers }
    />
    )

  })

  return (
    <div className={`text-up text-bolder scroll-y ${className}`}>
      { displayFixtures }
    </div>
  )
}

export default Fixtures
