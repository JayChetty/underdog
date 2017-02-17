import React from 'react'
import { Link } from 'react-router'

import NavSecondary from './NavSecondary'
import GroupOptions from '../groups/GroupOptions'

function Aside( { view, params, gameViewIndex, gameWeekIndex, displayWeekIndex, numberOfWeeks } ){

  let leftLink = `/weeks/${displayWeekIndex-1}`;
  let rightLink = `/weeks/${displayWeekIndex+1}`;

  if ( displayWeekIndex <= 0 ) {
    leftLink = null;
  }

  if ( displayWeekIndex >= numberOfWeeks-1 ) {
    rightLink = null;
  }

  let navbarSecondary = {
    weeks: <NavSecondary heading={ `MATCHDAY ${ gameViewIndex + 1 }` } leftLink={ leftLink } rightLink={ rightLink } />,
    groups: <NavSecondary heading="GROUPS" />
  }

  if ( params.groupId ) {
    navbarSecondary = {
      groups: <GroupOptions displayWeekIndex={ params.displayWeekIndex } groupId={ params.groupId } gameWeekIndex={ gameWeekIndex } />
    }
  }

  let navbarLeft = null;
  if ( view === "groups" && params.groupId ) {
    navbarLeft = <Link to={`/groups`} className="text-large text-blue"><i className="fa fa-angle-left" aria-hidden="true"></i></Link>
  }

  return(
    <aside className="aside-sticky">
      <div className="navbar-secondary layout-flex layout-flex-center-vertical">
        { navbarSecondary[view] }
      </div>
    </aside>
  )
}

export default Aside
