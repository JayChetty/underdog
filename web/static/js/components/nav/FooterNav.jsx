import React from 'react';
import { Link } from 'react-router';

const FooterNav = ( { gameWeekIndex, view } ) => {

  let gameClasses = "text-large";
  if ( view === "weeks" ) {
    gameClasses += " text-blue"
  }

  return(
    <footer className="navbar-footer layout-flex layout-justify-flex-space-around layout-flex-center-vertical">
      <Link to={`/weeks/${ gameWeekIndex }`} className={ gameClasses } activeClassName="text-blue">
        <i className="fa fa-gamepad" aria-hidden="true"></i>
      </Link>
      <Link to="/groups" className="text-medium" activeClassName="text-blue">
        <i className="fa fa-users" aria-hidden="true"></i>
      </Link>
    </footer>
  )

}

export default FooterNav;
