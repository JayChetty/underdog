import React from 'react'
import { connect } from 'react-redux';
import _ from "lodash"

function totalPoints(user, weeks){
  const parScores = weeks.map((week)=>{ return week.week_par })
  const par = _.sum(parScores)

  const allFixtures = _.flatten( weeks.map((week)=>{ return week.fixtures }) )
  const upsetPoints = user.predictions.map((prediction)=>{
    const fixture = allFixtures.find( (fixture)=>{
      return fixture.id === prediction.fixture_id
    })
    if(!fixture.home_team_score){
      return 0 //don't add predicted scores here
    }
    return fixture.upset_modifier
  })
  const totalPredictionPoints = _.sum(upsetPoints)

  return par + totalPredictionPoints

}

function Group({group, weeks}){
  if(!group){ return null }
  const userViews = group.users.map((user)=>{
    return <div key={user.id} className='list-item'>
      <div className="layout-flex">
        <div className="layout-flex-grow-11 text-small">{user.email}</div>
        <div className="layout-flex-grow-1 layout-flex layout-flex-center-vertical layout-justify-flex-end">
          <div className="tag tag-active pulse">{totalPoints(user, weeks)}</div>
        </div>
      </div>
    </div>
  })
  return(
   <div className = 'list-view'>
     { userViews }
   </div>
  )
}

const mapStateToProps = (state, { params, route } )=>{
  const group = state.groups.items.find((group)=>{
    return group.id === Number(params.groupId)
  })
  return {
    group: group,
    weeks: state.weeks.items
  }
}


export default connect( mapStateToProps )( Group )
