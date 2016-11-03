import React from "react"

const InAppNotify = ( { notify, inGroups, notificationGroup } ) => {
  if ( !notify.isNotifying || inGroups || isSender ) { return null; }

  return(
    <div className="toast slide-in-and-out layout-flex">
      <div className="layout-flex layout-flex-center text-large layout-flex-grow-2">
        <i className="fa fa-commenting-o" aria-hidden="true"></i>
      </div>
      <div className="layout-flex-grow-10">
        <div className="text-up text-small text-bolder">{ notificationGroup }</div>
        <div>{ notify.userName }: { notify.body }</div>
      </div>
    </div>
  )
}

export default InAppNotify;
