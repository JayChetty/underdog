import React, { Component } from 'react'
import Fixture from './Fixture'

class Fixtures extends Component {

  render() {
    const fixtures = this.props.fixtures.map( ( fixture ) => {
      return( <Fixture key={fixture.id} fixture={fixture} dispatch={this.props.dispatch} session={this.props.session} /> )
    })

    return (
      <div>
        { fixtures }
      </div>
    )
  }

}

export default Fixtures
