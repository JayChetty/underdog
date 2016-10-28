import React, { Component } from 'react'
import _ from 'lodash'

function Fixture( {fixture, makePrediction, deletePrediction, isGameWeek, isInPast, prediction, matchesInPlay} ){

  let homeTeamClasses = "split-list-view-left layout-flex-grow-6 layout-flex layout-flex-center-vertical layout-justify-flex-space-between"
  let awayTeamClasses = "split-list-view-right layout-flex-grow-6 layout-flex layout-flex-center-vertical layout-justify-flex-space-between"
  let homeTeamPointsClasses = "tag"
  let awayTeamPointsClasses = "tag"

  let tagAnimationHome = null;
  let tagAnimationAway = null;

  let clickHandler = ()=>{ console.log("NOT IN GAME WEEK") };

  const homeTeamPredictedWinner = fixture.home_team_ug_points < fixture.away_team_ug_points
  const predictUpset = !!prediction
  const mayHavePredictions = isGameWeek || isInPast
  const activeGameWeek = isGameWeek && !matchesInPlay


  if( mayHavePredictions ){
    if(activeGameWeek){
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
    }else{
        const homeTeamWon = fixture.home_team_score > fixture.away_team_score
        const awayTeamWon = fixture.home_team_score < fixture.away_team_score
        if( (homeTeamPredictedWinner && !predictUpset) || (!homeTeamPredictedWinner && predictUpset)  ){
          homeTeamClasses += " bg-light-gray"
          homeTeamPointsClasses = "tag tag-simple"
          // tagAnimationHome = <div className="tag tag-animate tag-warning slide-left" ><i className="fa fa-times" aria-hidden="true"></i></div>
          if( homeTeamWon ){
            homeTeamPointsClasses = "tag tag-simple bg-green"
            if(predictUpset){
              homeTeamPointsClasses += " pulse-big"
            }else{
              homeTeamPointsClasses += " pulse"
            }
            tagAnimationHome = <div className="tag tag-animate tag-success slide-left" ><i className="fa fa-check" aria-hidden="true"></i></div>
          }

        }else{
          awayTeamClasses += " bg-light-gray"
          awayTeamPointsClasses = "tag tag-simple"
          // tagAnimationAway = <div className="tag tag-animate tag-warning translate-left-20 slide-right" ><i className="fa fa-times" aria-hidden="true"></i></div>

          if( awayTeamWon ){
            awayTeamPointsClasses = "tag tag-simple bg-green"
            if(predictUpset){
              awayTeamPointsClasses += " pulse-big"
            }else{
              awayTeamPointsClasses += " pulse"
            }
            tagAnimationAway = <div className="tag tag-animate tag-success translate-left-20 slide-right" ><i className="fa fa-check" aria-hidden="true"></i></div>
          }
        }
    }
  }
{/*<div className="tag tag-animate tag-success" ><i className="fa fa-check" aria-hidden="true"></i></div>*/}

  return(
    <div className="split-list-view layout-flex">
      <div className={ homeTeamClasses } onClick={ clickHandler }>
        <div className="tags">
          <div className={ homeTeamPointsClasses } > { fixture.home_team_ug_points } </div>
          { tagAnimationHome }
        </div>
        <div>
          <span className="text-x-small">{ fixture.home_team.name }</span>
          <img src={ fixture.home_team.image } />
          <span className="text-small"> { fixture.home_team_score } </span>
        </div>
      </div>
      <div className={ awayTeamClasses } onClick={ clickHandler }>
        <div>
          <span className="text-small">{ fixture.away_team_score }</span>
          <img src={ fixture.away_team.image } />
          <span className="text-x-small">{ fixture.away_team.name }</span>
        </div>
        <div className="tags">
          { tagAnimationAway }
          <div className={ awayTeamPointsClasses }>{  fixture.away_team_ug_points  }</div>
        </div>
      </div>
    </div>
  )
}



export default Fixture
