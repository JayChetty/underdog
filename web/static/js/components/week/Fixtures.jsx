import React, { Component } from 'react'
import Fixture from './Fixture'

function Fixtures( props ){
  if( !props.fixtures ) { return null }
  const fixtures = props.fixtures.map( ( fixture ) => {
    return( <Fixture
      key={fixture.id}
      fixture={fixture}
      dispatch={props.dispatch}
      session={props.session} />
    )
  })

  return (
    <div>
      { fixtures }
    </div>
  )
}

export default Fixtures
