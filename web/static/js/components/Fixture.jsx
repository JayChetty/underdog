import React, { Component } from 'react'

class Fixture extends Component {

  render() {
    const { fixture } = this.props
    return(
      <div>
        <img src={fixture.homeTeamImg} width="30"/>
        <span>{ fixture.homeTeam.name }</span> V
        <span>{ fixture.awayTeam.name }</span>
        <img src={fixture.awayTeamImg} width="30"/>
        <form>
          <label>Upset?</label>
          <input type="checkbox" />
        </form>
      </div>
    )
  }

}

export default Fixture
