import React from 'react'

function FixturesSummary(
  { isInPast, weeklyPoints, endOfPredictions,
    isGameWeek, matchesInPlay, friendOnDisplay } ){

  let additionalInfo = null
  if(isGameWeek && !friendOnDisplay){
    additionalInfo = (
    <div className="go-left">
      <div className="text-blue">LAST PREDICTIONS</div>
      <div className="text-bold"> {endOfPredictions.format('ddd Do h:mma')} </div>
    </div>
  )
  }
  if(friendOnDisplay){
    additionalInfo = (
    <div className="go-left">
      <div className="text-blue">{ friendOnDisplay.name }</div>
    </div>
  )
  }

  let total = null
  if(isInPast || isGameWeek){
    total = (
    <div className="go-right">
      <div className="text-bold text-large tag tag-large tag-simple bg-green">{ weeklyPoints }</div>
    </div>
    )

    if(isGameWeek && !matchesInPlay){
      total = (
      <div className="go-right">
        <div className="text-bold text-large tag tag-large tag-simple bg-blue">{ weeklyPoints }</div>
      </div>
    )
    }
  }

  return (
    <footer className="layout-footer">
      { total }
      { additionalInfo }
    </footer>
  )
}

export default FixturesSummary
//
// <div className="text-blue"> MAX POINTS </div>
//       <div className="text-green"> TOTAL POINTS </div>

{/*<div className="go-left">
  <div className="text-blue">TOTAL POINTS</div>
  <div className="text-bold text-large">{ totalPoints }</div>
</div>*/}

{/*<div className="text-blue">{ isInPast || (isGameWeek && matchesInPlay) ? "TOTAL POINTS" : "POTENTIAL POINTS" }</div>*/}
