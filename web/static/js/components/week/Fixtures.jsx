import React, { Component } from 'react'
import Fixture from './Fixture'

function Fixtures( { fixtures, makePrediction } ){
  if( !fixtures ) { return null }
  const displayFixtures = fixtures.map( ( fixture ) => {
    return( <Fixture
      key={fixture.id}
      fixture={fixture}
      makePrediction={ makePrediction }
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
