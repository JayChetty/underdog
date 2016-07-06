import React, { Component } from 'react'
import Fixture from './Fixture'

class Fixtures extends Component {

  render() {
    const fixtures = this.props.fixtures.map( ( fixture ) => {
      return( <Fixture key={fixture.id} fixture={fixture} /> ) } )

    return (
      <main className="content">
        <div className="content-header">Your Predictions</div>
        <div className="list-view">
          { fixtures }
        </div>
      </main>

    )
  }

}

export default Fixtures
