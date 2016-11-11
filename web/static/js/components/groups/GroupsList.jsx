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
        <Link to={ `/groups/${group.id}/chat` } className="layout-flex">
          <div className="layout-flex-grow-11">
            <div className="text-blue text-small text-up">{ group.name }</div>
            <div className="text-medium">{ users }</div>
            <div className="text-gray">{ lastMessage.body }</div>
          </div>
          <div className="layout-flex layout-flex-center layout-flex-grow-1 text-large">
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </div>
        </Link>
      </div>
    )
  })
  return(
   <div>
     { groupViews }
   </div>
  )
}

function mapStateToProps(state, {params} ){
  return{
    groups: state.groups.items
  }
}
export default connect(mapStateToProps)(GroupsList)
