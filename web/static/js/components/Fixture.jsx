import React, { Component } from 'react'

class Fixture extends Component {

  render() {
    const { fixture } = this.props
    if(!fixture.homeTeam){
      return <div> ...loading Team Data ß</div>
    }
    return(
      <div>
        <img src={fixture.homeTeam.image} width="30"/>
        <span>{ fixture.homeTeam.name } { fixture.home_team_score }</span> V
        <span>{ fixture.awayTeam.name } { fixture.away_team_score } </span>
        <img src={fixture.awayTeam.image} width="30"/>
        <form>
          <label>Upset?</label>
          <input type="checkbox" />
        </form>
      </div>
    )
  }

}

export default Fixture
