import React from 'react'
import { Link } from 'react-router'

import NavSecondarySimple from './NavSecondarySimple'
import GroupOptions from '../groups/GroupOptions'

function Nav( { view, params, gameViewIndex, gameWeekIndex } ){
  console.log( "view", view )
  console.log( "params", params )

  const navbarRight = {
    weeks: <Link to={"/groups"}><i className="fa fa-users" aria-hidden="true"></i></Link>,
    groups: <Link to={`/weeks/${ gameWeekIndex }`}><i className="fa fa-th-list" aria-hidden="true"></i></Link>
  }

  let navbarSecondary = {
    weeks: <NavSecondarySimple subHeading={ `MATCHDAY ${ gameViewIndex + 1 }` } />,
    groups: <NavSecondarySimple subHeading="GROUPS" />,
  }

  if ( params.groupId ) {
    navbarSecondary = {
      groups: <GroupOptions groupId={ params.groupId } />
    }
  }

  return(
    <nav className="layout-flex layout-navbar layout-flex-direction-column">
      <div className="layout-flex layout-justify-flex-space-between layout-flex-grow-8">
        <div className="navbar-left layout-flex-grow-2 layout-flex-center-vertical layout-flex layout-justify-flex-start">

        </div>
        <div className="navbar-header layout-flex-grow-8 layout-flex layout-flex-center">
          UNDER<span className="text-bold">DOG</span>
        </div>
        <div className="layout-flex navbar-right layout-flex-grow-2 layout-flex-center">
          { navbarRight[view] }
        </div>
      </div>
      <div className="navbar-secondary layout-flex-grow-4 layout-flex layout-flex-center">
        { navbarSecondary[view] }
      </div>
    </nav>
  )
}

export default Nav
