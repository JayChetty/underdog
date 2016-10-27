import React from 'react'
import { Link } from 'react-router'

function Nav( { view, gameWeekIndex } ){

  const navbarRight = {
    weeks: <Link to={"/groups"}><i className="fa fa-users" aria-hidden="true"></i></Link>,
    groups: <Link to={`/weeks/${ gameWeekIndex }`}><i className="fa fa-th-list" aria-hidden="true"></i></Link>
  }

  return(
    <nav className="layout-navbar layout-flex layout-justify-flex-space-between">
      <div className="navbar-left layout-flex-grow-2 layout-flex-center-vertical layout-flex layout-justify-flex-start">

      </div>
      <div className="navbar-header layout-flex-grow-8 layout-flex layout-flex-center">
        UNDER<span className="text-bold">DOG</span>
      </div>
      <div className="layout-flex layout-justify-flex-end navbar-right layout-flex-grow-2 layout-flex-center-vertical">
        { navbarRight[view] }
      </div>
    </nav>
  )
}

export default Nav
