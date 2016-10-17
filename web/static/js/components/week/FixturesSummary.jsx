import React from 'react'

function FixturesSummary( { isPreviousWeek, points } ){

  return (
    <footer className="layout-footer">
      <div>
        <div className="text-blue">{ isPreviousWeek ? "TOTAL POINTS" : "POTENTIAL POINTS" }</div>
        <div className="text-bold text-large">{ points() }</div>
      </div>
    </footer>
  )
}

export default FixturesSummary
