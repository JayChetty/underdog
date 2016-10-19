import React from 'react'
import { connect } from 'react-redux'

function GroupsList({groups}){
  console.log('groups', groups)
  const groupViews = groups.map((group)=>{
    return( <div> { group.name } </div> )
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
