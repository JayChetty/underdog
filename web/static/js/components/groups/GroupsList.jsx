import React from 'react'
import { connect } from 'react-redux'
import actions from '../../actions/actions';
import {Link} from 'react-router';

function GroupsList({groups}){
  console.log('groups', groups)
  const groupViews = groups.map((group)=>{

    const users = group.users.map( ( user ) => {
      return user.email
    }).join(", ")

    return(
      <div key={group.id} className="list-item">
        <Link to={ `/groups/${group.id}` } activeClassName='nav-link' className='nav-link'>
          <div className="layout-flex">
            <div className="layout-flex-grow-11">
              <div className="text-blue text-medium text-second">{ group.name }</div>
              <div>{ users }</div>
            </div>
            <div className="layout-flex layout-flex-center layout-flex-grow-1 text-medium">
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </div>
          </div>
        </Link>
      </div>
    )
  })
  return(
   <main className="layout-content">
     { groupViews }
   </main>
  )
}

function mapStateToProps(state, {params} ){
  return{
    groups: state.groups.items
  }
}
export default connect(mapStateToProps)(GroupsList)
