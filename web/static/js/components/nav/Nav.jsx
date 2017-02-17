import React from 'react';
import { Link } from 'react-router';

const Nav = ( { gameWeekIndex, view, inGroup, groupId } ) => {
  console.log("nav group id", groupId)
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
                  {/*<Link to="/groups" className="layout-flex layout-flex-center-vertical">
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                  </Link>*/}
                  <div>
                    hello
                    <i className="fa fa-user-plus" aria-hidden="true"></i>
                    <Link to={ `/groups/${groupId}/invite` } className="layout-flex layout-flex-center-vertical">
                      <i className="fa fa fa-user-plus" aria-hidden="true"></i>
                    </Link>
                  </div>
                </div>
  }

  return(
    <nav className="nav-sticky">
      { navigation }
    </nav>
  )

}

export default Nav;
