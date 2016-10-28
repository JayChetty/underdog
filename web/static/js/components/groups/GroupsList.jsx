import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router';

function GroupsList({groups}){

  const groupViews = groups.map((group)=>{
    const lastMessage = group.messages[ group.messages.length - 1 ] || ""

    const users = group.users.map( ( user ) => {
      return user.name || user.email
    }).join(", ")

    return(
      <div key={group.id} className="list-item">
        <Link to={ `/groups/${group.id}/chat` } activeClassName='nav-link' className='nav-link'>
          <div className="layout-flex">
            <div className="layout-flex-grow-11">
              <div className="text-blue text-small text-up">{ group.name }</div>
              <div className="text-medium">{ users }</div>
              <div className="text-gray">{ lastMessage.body }</div>
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
