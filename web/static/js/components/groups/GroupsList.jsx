import React from 'react'
import { connect } from 'react-redux'
import actions from '../../actions/actions';
import {Link} from 'react-router';

function GroupsList({groups}){
  console.log('groups', groups)
  const groupViews = groups.map((group)=>{
    return(  <Link
                key={group.id}
                to={ `/groups/${group.id}` }
              >
              { group.name }
            </Link> )
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
