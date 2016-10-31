import React from 'react'
import { Link } from "react-router"

function GroupOptions( { groupId, gameWeekIndex, displayWeekIndex } ) {

  let weeksClasses = "button-split"
  if ( displayWeekIndex ) {
    weeksClasses = `${ weeksClasses } bg-blue`
  }

  return(
    <div className="layout-flex button button-full-width layout-justify-flex-space-between">
      <Link to={`/groups/${ groupId }/chat`} className="button-split" activeClassName="bg-blue">Chat</Link>
      <Link to={`/groups/${ groupId }/weeks/${ gameWeekIndex-1 }`} className={ weeksClasses } activeClassName="bg-blue">Predictions</Link>
      <Link to={`/groups/${ groupId }/table`} className="button-split" activeClassName="bg-blue">Table</Link>
    </div>
  )

}

export default GroupOptions;
