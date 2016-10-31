import React from 'react'
import { Link } from "react-router"

function GroupOptions( { groupId, gameWeekIndex } ) {

  return(
    <div className="layout-flex button button-full-width layout-justify-flex-space-between">
      <Link to={`/groups/${ groupId }/chat`} className="button-split" activeClassName="bg-blue">Chat</Link>
      <Link to={`/groups/${ groupId }/weeks/${ gameWeekIndex }`} className="button-split" activeClassName="bg-blue">Predictions</Link>
      <Link to={`/groups/${ groupId }/table`} className="button-split" activeClassName="bg-blue">Table</Link>
    </div>
  )

}

export default GroupOptions;
