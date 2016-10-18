import React from 'react'

function FixturesSummary( { isPreviousWeek, points, totalPoints } ){

  return (
    <footer className="layout-footer">
      <div className="go-left">
        <div className="text-blue">TOTAL POINTS</div>
        <div className="text-bold text-large">{ totalPoints() }</div>
      </div>
      <div className="go-right">
        <div className="text-blue">{ isPreviousWeek ? "TOTAL POINTS" : "POTENTIAL POINTS" }</div>
        <div className="text-bold text-large">{ points() }</div>
      </div>
    </footer>
  )
}

export default FixturesSummary
