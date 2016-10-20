import React from 'react'

function FixturesSummary( { isInPast, weeklyPoints } ){

  return (
    <footer className="layout-footer">
      <div className="go-right">
        <div className="text-blue">{ isInPast ? "TOTAL POINTS" : "POTENTIAL POINTS" }</div>
        <div className="text-bold text-large">{ weeklyPoints }</div>
      </div>
    </footer>
  )
}

export default FixturesSummary


{/*<div className="go-left">
  <div className="text-blue">TOTAL POINTS</div>
  <div className="text-bold text-large">{ totalPoints }</div>
</div>*/}
