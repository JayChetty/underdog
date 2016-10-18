import React, { Component } from 'react'
import _ from 'lodash'
import { isHomeTeamPredictedWinner, calcHomeTeamPointResult, calcAwayTeamPointResult} from '../../game_library/undergod_game_calculator'

function Fixture( {fixture, makePrediction, isInGameWeek, weekNumber, gameWeekNumber} ){
  if(!fixture.homeTeam){ return null; }

  let homeTeamClasses = "split-list-view-left"
  let awayTeamClasses = "split-list-view-right"
  let homeTeamPointsClasses = "tag go-left"
  let awayTeamPointsClasses = "tag go-right"

  let clickHandler = ()=>{ console.log("NOT IN GAME WEEK") };

  if( isInGameWeek ){
    clickHandler = () => { makePrediction( { fixture_id: fixture.id, type: 'upset' }, fixture ) }
    if( isHomeTeamPredictedWinner( fixture, weekNumber ) ){
      homeTeamClasses += " bg-blue"
      homeTeamPointsClasses += " tag-simple pulse"
    }else{
      awayTeamClasses += " bg-blue"
      awayTeamPointsClasses += " tag-simple pulse"
    }
  }else {
    const isInPast = weekNumber < gameWeekNumber
    if(isInPast){
      if( isHomeTeamPredictedWinner( fixture, weekNumber ) ){
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
        <span className={ homeTeamPointsClasses } > { calcHomeTeamPointResult( fixture, weekNumber ) } </span>
        <span>{ fixture.homeTeam.name }</span>
        <img src={ fixture.homeTeam.image } />
        <span> { fixture.home_team_score } </span>
      </div>
      <div className={ awayTeamClasses } onClick={ clickHandler }>
        <span> { fixture.away_team_score } </span>
        <img src={ fixture.awayTeam.image } />
        <span>{ fixture.awayTeam.name }</span>
        <span className={ awayTeamPointsClasses }> { calcAwayTeamPointResult( fixture, weekNumber ) } </span>
      </div>
    </div>
  )
}



export default Fixture
