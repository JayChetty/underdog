import React from 'react'
import { connect } from 'react-redux';

function Group({group}){
  if(!group){ return null }
  const userViews = group.users.map((user)=>{
    return <li key={user.id}>
      {user.email}
    </li>
  })
  return(
   <ul>
     { userViews }
   </ul>
  )
}

const mapStateToProps = (state, { params, route } )=>{
  const group = state.groups.items.find((group)=>{
    return group.id === Number(params.groupId)
  })
  return {
    group: group
  }
}


export default connect( mapStateToProps )( Group )
