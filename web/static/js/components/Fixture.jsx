import React, { Component } from 'react'

class Fixture extends Component {

  render() {
    const { fixture } = this.props
    return(
      <div className="split-list-view">
        <div className="split-list-view-left bg-green">
          <span>{ fixture.homeTeam.name }</span>
          <img src="http://www.promatica.co.uk/sites/default/pagecontent/getpageimage/3244" />
        </div>
        <div className="split-list-view-right">
          <img src="http://www.promatica.co.uk/sites/default/pagecontent/getpageimage/3244" />
          <span>{ fixture.awayTeam.name }</span>
        </div>
        {/*<form>
          <label>Upset?</label>
          <input type="checkbox" />
        </form>*/}
      </div>
    )
  }

}

export default Fixture
