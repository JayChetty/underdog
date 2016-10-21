import React from 'react'
import { connect } from 'react-redux'
import actions from '../../actions/actions';
import {Link} from 'react-router';

function GroupsList({groups}){
  console.log('groups', groups)
  const groupViews = groups.map((group)=>{

    return(
      <div key={group.id} className="list-item">
        <Link to={ `/groups/${group.id}` } activeClassName='nav-link' className='nav-link'>
          <span className="text-large"> { group.name } </span>
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
