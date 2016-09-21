import React, { Component } from 'react'

function Fixture( {fixture, makePrediction} ){
  if(!fixture.homeTeam){ return null; }
  let homeTeamClasses = "split-list-view-left"
  let awayTeamClasses = "split-list-view-right"
  let homeTeamPointsClasses = "tag go-left"
  let awayTeamPointsClasses = "tag go-right"

  if( homeTeamPredictedWinner( fixture ) ){
    homeTeamClasses += " bg-blue"
    homeTeamPointsClasses += " tag-simple pulse"
  }else{
    awayTeamClasses += " bg-blue"
    awayTeamPointsClasses += " tag-simple pulse"
  }

  return(
    <div className="split-list-view">
      <div className={ homeTeamClasses } onClick={ () => { makePrediction( { fixture_id: fixture.id, type: 'upset' } ) } }>
        <span className={ homeTeamPointsClasses } > { homeTeamPointResult( fixture ) } </span>
        <span>{ fixture.homeTeam.name }</span>
        <img src={ fixture.homeTeam.image } />
      </div>
      <div className={ awayTeamClasses } onClick={ () => { makePrediction( { fixture_id: fixture.id, type: 'upset' } ) } }>
        <img src={ fixture.awayTeam.image } />
        <span>{ fixture.awayTeam.name }</span>
        <span className={ awayTeamPointsClasses }> { awayTeamPointResult( fixture ) } </span>
      </div>
    </div>
  )
}


function homeTeamFavourite(fixture){
  return fixture.homeTeam.points >= fixture.awayTeam.points;
}

function homeTeamPredictedWinner(fixture){
  const output = homeTeamFavourite(fixture)
  return predictsUpset(fixture.prediction) ? !output : output;
}

function predictsUpset(prediction){
  return prediction && prediction.type === "upset"
}

function predictsMauling(prediction){
  return prediction && prediction.type === "maul"
}

function homeTeamPointDifference(fixture){
  return fixture.homeTeam.points - fixture.awayTeam.points;
}


function gamePointsForPointDifference( pointDifference ){
   return 3 + Math.max(0, pointDifference * -1 )
}

function homeTeamPointResult( fixture ){
  return gamePointsForPointDifference( homeTeamPointDifference(fixture) )
}

function awayTeamPointResult( fixture ){
  return gamePointsForPointDifference( homeTeamPointDifference(fixture) * -1 )
}

export default Fixture
