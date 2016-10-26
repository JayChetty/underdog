import React from 'react'
import { Link } from 'react-router'

function Nav( { view, gameWeekIndex } ){

  const navbarRight = {
    weeks: <Link to={"/groups"}><i className="fa fa-users" aria-hidden="true"></i></Link>,
    groups: <Link to={`/weeks/${ gameWeekIndex }`}><i className="fa fa-th-list" aria-hidden="true"></i></Link>
  }

  return(
    <nav className="layout-navbar layout-flex-grow-1">
      <div className="navbar-header">
        UNDER<span className="text-bold">DOG</span>
      </div>
      <div className="layout-flex navbar-right">
        { navbarRight[view] }
      </div>
    </nav>
  )
}

export default Nav
