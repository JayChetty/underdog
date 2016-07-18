import React, { Component } from 'react'

class FixturesSummary extends Component {

  render() {
    return (
      <footer className="layout-footer">
        <div className="text-green">POTENTIAL POINTS</div>
        <div className="text-bold text-large">{ this.props.potentialPoints }</div>
      </footer>
    )
  }

}

export default FixturesSummary
