import React from "react"
import { Link } from "react-router"

function NavSeconadary( { heading, subHeading, leftLink, rightLink } ) {

  let linkOnLeft = null;
  let linkOnRight = null;

  if ( leftLink ) {
    linkOnLeft = <Link to={ leftLink } className="text-blue"><i className="fa fa-angle-left" aria-hidden="true"></i></Link>
  }

  if ( rightLink ) {
    linkOnRight = <Link to={ rightLink } className="text-blue"><i className="fa fa-angle-right" aria-hidden="true"></i></Link>
  }

  return(
    <div className="text-small text-bolder layout-flex layout-full-width">
      <div className="layout-flex-grow-1 text-large layout-flex layout-flex-center">
        { linkOnLeft }
      </div>
      <div className="layout-flex-grow-10 layout-flex layout-flex-center">
        { heading }
      </div>
      <div className="layout-flex-grow-1 text-blue text-large layout-flex layout-flex-center">
        { linkOnRight }
      </div>
    </div>
  )

}

export default NavSeconadary;
