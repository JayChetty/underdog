import React from "react"
import { Link } from "react-router"

const InAppNotify = ( { notify, inGroups, notificationGroup, isSender } ) => {
  if ( !notify.isNotifying || inGroups || isSender ) { return null; }

  return(
    <Link to={`/groups/${ notify.groupId }/chat`}>
      <div className="toast slide-in-and-out layout-flex">
        <div className="layout-flex layout-flex-center text-large layout-flex-grow-2">
          <i className="fa fa-commenting-o" aria-hidden="true"></i>
        </div>
        <div className="layout-flex-grow-10">
          <div className="text-up text-small text-bolder">{ notificationGroup }</div>
          <div>{ notify.userName }: { notify.body }</div>
        </div>
      </div>
    </Link>
  )
}

export default InAppNotify;
