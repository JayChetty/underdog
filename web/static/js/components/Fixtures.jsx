import React, { Component } from 'react'
import Fixture from './Fixture'

class Fixtures extends Component {

  render() {
    const fixtures = this.props.fixtures.map( ( fixture,index ) => {
      return( <Fixture key={index} fixture={fixture} /> ) } )

    return (
      <div>
        <h2>Your Predictions</h2>
        { fixtures }
      </div>

    )
  }

}

export default Fixtures
