import React from 'react';
import { Link } from 'react-router';

const Nav = ( { gameWeekIndex, view, inGroup } ) => {

  let gameClasses = "";
  if ( view === "weeks" ) {
    gameClasses = "navbar-selected"
  }

  let navigation = <div className="navbar">
                    <Link to={`/weeks/${ gameWeekIndex }`} className={gameClasses} activeClassName="navbar-selected">
                      <i className="fa fa-gamepad" aria-hidden="true"></i>
                    </Link>
                    <Link to="/groups" activeClassName="navbar-selected">
                      <i className="fa fa-users" aria-hidden="true"></i>
                    </Link>
                  </div>

  if ( inGroup ) {
    navigation = <div className="navbar-simple">
                  <Link to="/groups" className="layout-flex layout-flex-center-vertical">
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                  </Link>
                </div>
  }

  return(
    <nav>
      { navigation }
    </nav>
  )

}

export default Nav;
