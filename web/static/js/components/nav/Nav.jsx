import React from 'react'
import {Link} from 'react-router'

function Nav(props){
  return(
    <nav className="layout-navbar">
      <div className="navbar-header">
        UNDER<span className="text-bold">GOD</span>
      </div>
      <div className="layout-flex navbar-right">
        <Link to={"/groups"}><i className="fa fa-users" aria-hidden="true"></i></Link>
      </div>
    </nav>
  )
}

export default Nav
