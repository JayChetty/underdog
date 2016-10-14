import React, { Component } from 'react'
import _ from 'lodash'

function Fixture( {fixture, makePrediction, isInGameWeek, weekNumber} ){
  // console.log('rendering fixture', fixture)
  if(!fixture.homeTeam){ return null; }

  let homeTeamClasses = "split-list-view-left"
  let awayTeamClasses = "split-list-view-right"
  let homeTeamPointsClasses = "tag go-left"
  let awayTeamPointsClasses = "tag go-right"

  let clickHandler = ()=>{ console.log("NOT IN GAME WEEK") };
  if( isInGameWeek ){
    clickHandler = () => { makePrediction( { fixture_id: fixture.id, type: 'upset' }, fixture ) }
    if( homeTeamPredictedWinner( fixture, weekNumber ) ){
      homeTeamClasses += " bg-blue"
      homeTeamPointsClasses += " tag-simple pulse"
    }else{
      awayTeamClasses += " bg-blue"
      awayTeamPointsClasses += " tag-simple pulse"
    }
  }
  return(
    <div className="split-list-view">
      <div className={ homeTeamClasses } onClick={ clickHandler }>
        <span className={ homeTeamPointsClasses } > { homeTeamPointResult( fixture, weekNumber ) } </span>
        <span>{ fixture.homeTeam.name }</span>
        <img src={ fixture.homeTeam.image } />
        <span> { fixture.home_team_score } </span>
      </div>
      <div className={ awayTeamClasses } onClick={ clickHandler }>
        <span> { fixture.away_team_score } </span>
        <img src={ fixture.awayTeam.image } />
        <span>{ fixture.awayTeam.name }</span>
        <span className={ awayTeamPointsClasses }> { awayTeamPointResult( fixture, weekNumber ) } </span>
      </div>
    </div>
  )
}

function cumulativePoints(points, weekNumber){
 const pointsToWeek = points.slice(0, weekNumber-1)
 return _.sum( pointsToWeek )
}

function homeTeamPredictedWinner(fixture, weekNumber){
  const output = homeTeamPointDifference(fixture, weekNumber) > 0
  return predictsUpset(fixture.prediction) ? !output : output;
}

function predictsUpset(prediction){
  return prediction && prediction.type === "upset"
}

function predictsMauling(prediction){
  return prediction && prediction.type === "maul"
}

function homeTeamPointDifference(fixture, weekNumber){
  const homeTeamPoints = cumulativePoints( fixture.homeTeam.points, weekNumber )
  const awayTeamPoints = cumulativePoints( fixture.awayTeam.points, weekNumber)
  return homeTeamPoints - awayTeamPoints;
}


function gamePointsForPointDifference( pointDifference ){
   return 3 + Math.max(0, pointDifference * -1 )
}

function homeTeamPointResult( fixture, weekNumber ){
  return gamePointsForPointDifference( homeTeamPointDifference(fixture, weekNumber) )
}

function awayTeamPointResult( fixture, weekNumber ){
  return gamePointsForPointDifference( homeTeamPointDifference(fixture, weekNumber) * -1 )
}

export default Fixture
