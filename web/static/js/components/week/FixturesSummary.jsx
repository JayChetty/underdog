import React from 'react'

function FixturesSummary( { isInPast, weeklyPoints, endOfPredictions, isGameWeek, matchesInPlay } ){

  let countdown = null
  if(isGameWeek){
    countdown = (
    <div className="go-left">
      <div className="text-blue">LAST PREDICTIONS</div>
      <div className="text-bold"> {endOfPredictions.format('ddd Do h:mma')} </div>
    </div>
  )
  }

  return (
    <footer className="layout-footer">
      <div className="go-right">
        <div className="text-blue">{ isInPast || (isGameWeek && matchesInPlay) ? "TOTAL POINTS" : "POTENTIAL POINTS" }</div>
        <div className="text-bold text-large">{ weeklyPoints }</div>
      </div>
      { countdown }
    </footer>
  )
}

export default FixturesSummary


{/*<div className="go-left">
  <div className="text-blue">TOTAL POINTS</div>
  <div className="text-bold text-large">{ totalPoints }</div>
</div>*/}
