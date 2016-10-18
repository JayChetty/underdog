import React from 'react'
import {Link} from 'react-router'

function gotoGroups(){
  console.log('clicked groups')
}


function Nav(props){
  return(
    <nav className="layout-navbar">
      <div className="navbar-header">
        UNDER<span className="text-bold">GOD</span>
        <Link to={"/groups"}> groups </Link>
      </div>
    </nav>
  )
}


export default Nav

// {/*className={}
// activeClassName={ }*/}
