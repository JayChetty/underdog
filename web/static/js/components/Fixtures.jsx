import React, { Component } from 'react'
import Fixture from './Fixture'

class Fixtures extends Component {

  render() {
    const fixtures = this.props.fixtures.map( ( fixture ) => {
      return( <Fixture key={fixture.id} fixture={fixture} dispatch={this.props.dispatch} session={this.props.session} /> )
    })

    // const gameWeek = this.props.fixtures[0].week_id

    return (
      <main className="layout-content">
        <div className="content-header">WEEK </div>
        <div className="list-view">
          { fixtures }
        </div>
      </main>

    )
  }

}

export default Fixtures
