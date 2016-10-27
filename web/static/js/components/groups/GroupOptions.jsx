import React from 'react'
import { Link } from "react-router"

function GroupOptions( { groupId } ) {

  return(
    <div className="bg-light-gray">
      <div className="layout-flex button layout-justify-flex-space-between">
        <Link to={`/groups/${ groupId }/chat`} className="button-split" activeClassName="bg-blue">Chat</Link>
        <Link to={`/groups/${ groupId }/table`} className="button-split" activeClassName="bg-blue">Table</Link>
      </div>
    </div>
  )

}

export default GroupOptions;
