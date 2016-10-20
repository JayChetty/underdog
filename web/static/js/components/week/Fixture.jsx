import React, { Component } from 'react'
import _ from 'lodash'
import { isHomeTeamPredictedWinner, calcHomeTeamPointResult, calcAwayTeamPointResult} from '../../libs/undergod_game'

function Fixture( {fixture, makePrediction, deletePrediction, isGameWeek, isInPast, prediction} ){

  let homeTeamClasses = "split-list-view-left"
  let awayTeamClasses = "split-list-view-right"
  let homeTeamPointsClasses = "tag go-left"
  let awayTeamPointsClasses = "tag go-right"

  let clickHandler = ()=>{ console.log("NOT IN GAME WEEK") };

  // console.log('prediction', prediction)
  // if(prediction){
  //   clickHandler = () => { deletePrediction( prediction  ) }
  // }else{
  //   clickHandler = () => { makePrediction( { fixture_id: fixture.id, type: 'upset' } ) }
  // }

  if( isGameWeek ){
    const homeTeamPredictedWinner = fixture.home_team_ug_points < fixture.away_team_ug_points
    const predictUpset = !!prediction
    if(prediction){
      clickHandler = () => { deletePrediction( prediction  ) }
    }else{
      clickHandler = () => { makePrediction( { fixture_id: fixture.id, type: 'upset' } ) }
    }
    if( (homeTeamPredictedWinner && !predictUpset) || (!homeTeamPredictedWinner && predictUpset)  ){
      homeTeamClasses += " bg-blue"
      homeTeamPointsClasses += " tag-simple pulse"
    }else{
      awayTeamClasses += " bg-blue"
      awayTeamPointsClasses += " tag-simple pulse"
    }
  }else {
    if(isInPast){
      if( fixture.home_team_ug_points < fixture.away_team_ug_points ){
        homeTeamClasses += " bg-gray"
        homeTeamPointsClasses += " tag-simple pulse"
      }else{
        awayTeamClasses += " bg-gray"
        awayTeamPointsClasses += " tag-simple pulse"
      }
    }
  }

  return(
    <div className="split-list-view">
      <div className={ homeTeamClasses } onClick={ clickHandler }>
        <span className={ homeTeamPointsClasses } > { fixture.home_team_ug_points } </span>
        <span>{ fixture.home_team.name }</span>
        <img src={ fixture.home_team.image } />
        <span> { fixture.home_team_score } </span>
      </div>
      <div className={ awayTeamClasses } onClick={ clickHandler }>
        <span> { fixture.away_team_score } </span>
        <img src={ fixture.away_team.image } />
        <span>{ fixture.away_team.name }</span>
        <span className={ awayTeamPointsClasses }> {  fixture.away_team_ug_points  } </span>
      </div>
    </div>
  )
}



export default Fixture
