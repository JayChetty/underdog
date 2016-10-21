import React, { Component } from 'react'
import _ from 'lodash'

function Fixture( {fixture, makePrediction, deletePrediction, isGameWeek, isInPast, prediction, inPlay} ){

  let homeTeamClasses = "split-list-view-left"
  let awayTeamClasses = "split-list-view-right"
  let homeTeamPointsClasses = "tag go-left"
  let awayTeamPointsClasses = "tag go-right"

  let clickHandler = ()=>{ console.log("NOT IN GAME WEEK") };

  const homeTeamPredictedWinner = fixture.home_team_ug_points < fixture.away_team_ug_points
  const predictUpset = !!prediction

  if( isGameWeek && !inPlay ){
    if(prediction){
      clickHandler = () => { deletePrediction( prediction  ) }
    }else{
      clickHandler = () => { makePrediction( { fixture_id: fixture.id, type: 'upset' } ) }
    }
    if( (homeTeamPredictedWinner && !predictUpset) || (!homeTeamPredictedWinner && predictUpset)  ){
      homeTeamClasses += " bg-blue"
      homeTeamPointsClasses += " tag-active pulse"
    }else{
      awayTeamClasses += " bg-blue"
      awayTeamPointsClasses += " tag-active pulse"
    }
  }else {
    const homeTeamWon = fixture.home_team_score > fixture.away_team_score
    const awayTeamWon = fixture.home_team_score < fixture.away_team_score
    if(isInPast || isGameWeek){
      if( homeTeamPredictedWinner ){
        homeTeamClasses += " bg-light-blue"
        homeTeamPointsClasses += " tag-simple pulse"
        if( homeTeamWon && !predictUpset  ){
          homeTeamPointsClasses += " bg-green"
        }
        if( awayTeamWon && predictUpset){
          awayTeamPointsClasses += " bg-bright_green"
        }

      }else{//away team predicted winner
        awayTeamClasses += " bg-light-blue"
        awayTeamPointsClasses += " tag-simple pulse"
        if( awayTeamWon && !predictUpset ){
          awayTeamPointsClasses += " bg-green"
        }
        if( homeTeamWon && predictUpset){
          homeTeamPointsClasses += " bg-bright_green"
        }
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
