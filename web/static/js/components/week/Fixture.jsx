import React, { Component } from 'react'
import _ from 'lodash'

let host = ""
if(window.isCordovaApp){
  // host = "http://localhost:4000"
  host = "https://guarded-hollows-82324.herokuapp.com"
}

function Fixture( {fixture, makePrediction, deletePrediction, isGameWeek, isInPast, prediction, matchesInPlay, groupUsers } ){

  let homeTeamClasses = "split-list-view-left layout-flex-grow-6 layout-flex layout-flex-direction-column"
  let awayTeamClasses = "split-list-view-right layout-flex-grow-6 layout-flex layout-flex-direction-column"
  let homeTeamPointsClasses = "tag"
  let awayTeamPointsClasses = "tag"

  let tagAnimationHome = null;
  let tagAnimationAway = null;

  let clickHandler = ()=>{ console.log("NOT IN GAME WEEK") };

  const homeTeamPredictedWinner = fixture.home_team_ug_points <= fixture.away_team_ug_points
  const predictUpset = !!prediction
  const mayHavePredictions = isGameWeek || isInPast
  const activeGameWeek = isGameWeek && !matchesInPlay


  let homeTeamGroupUsers = [];
  let awayTeamGroupUsers = [];

  if ( groupUsers ) {
    const predictions = groupUsers.forEach( ( user ) => {
      const userPrediction = user.predictions.find( ( prediction ) => { return prediction.fixture_id === fixture.id } )

      if (  (userPrediction && homeTeamPredictedWinner) || (!userPrediction && !homeTeamPredictedWinner)  ) {
        awayTeamGroupUsers = awayTeamGroupUsers.concat( [ user.name ] )
      } else {
        homeTeamGroupUsers = homeTeamGroupUsers.concat( [ user.name ] )
      }
    })

    homeTeamGroupUsers = homeTeamGroupUsers.map( ( userName, index ) => {
      return( <div key={index}>{ userName }</div> )
    })

    awayTeamGroupUsers = awayTeamGroupUsers.map( ( userName, index ) => {
      return( <div key={index}>{ userName }</div> )
    })

  }

  const homeTeamWon = fixture.home_team_score > fixture.away_team_score
  const awayTeamWon = fixture.home_team_score < fixture.away_team_score

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
      if ( groupUsers ) {

        if (homeTeamWon) {
          homeTeamClasses += " bg-light-gray"
          homeTeamPointsClasses = "tag tag-simple"
        }

        if (awayTeamWon) {
          awayTeamClasses += " bg-light-gray"
          awayTeamPointsClasses = "tag tag-simple"
        }


      } else if( (homeTeamPredictedWinner && !predictUpset) || (!homeTeamPredictedWinner && predictUpset)  ){
        homeTeamPointsClasses = "tag tag-simple"
        homeTeamClasses += " bg-light-gray"
        if( homeTeamWon ){
          homeTeamClasses += " bg-light-gray"
          homeTeamPointsClasses = "tag tag-simple bg-green"
          if(predictUpset){
            homeTeamPointsClasses += " pulse-big"
          }else{
            homeTeamPointsClasses += " pulse"
          }
          tagAnimationHome = <div className="tag tag-animate tag-success slide-left" ><i className="fa fa-check" aria-hidden="true"></i></div>

        }

      }else{
        awayTeamPointsClasses = "tag tag-simple"
        awayTeamClasses += " bg-light-gray"


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

  let homeTeamName = fixture.home_team.name
  let awayTeamName = fixture.away_team.name

  if ( homeTeamName === "Middlesbrough" ) {
    homeTeamName = "MIDDLES'BORO"
  }

  if ( awayTeamName === "Middlesbrough" ) {
    awayTeamName = "MIDDLES'BORO"
  }
  return(
    <div className="layout-flex">
      <div className={ homeTeamClasses } onClick={ clickHandler }>
        <div className="layout-flex layout-flex-center-vertical layout-justify-flex-space-between">
          <div className="tags">
            <div className={ homeTeamPointsClasses } > { mayHavePredictions && fixture.home_team_ug_points } </div>
            { tagAnimationHome }
          </div>
          <div>
            <span className="text-x-small">{ homeTeamName }</span>
            {/*<img src={ `${host}/images/teams/${fixture.home_team.name}.png` } />*/}
            <span className="text-small"> { fixture.home_team_score } </span>
          </div>
        </div>
        <div className="text-x-small text-transform-initial">{ homeTeamGroupUsers }</div>
      </div>
      <div className={ awayTeamClasses } onClick={ clickHandler }>
        <div className="layout-flex layout-flex-center-vertical layout-justify-flex-space-between">
          <div>
            <span className="text-small">{ fixture.away_team_score }</span>
            {/*<img src={ `${host}/images/teams/${fixture.away_team.name}.png` } />*/}
            <span className="text-x-small">{ awayTeamName }</span>
          </div>
          <div className="tags">
            { tagAnimationAway }
            <div className={ awayTeamPointsClasses }>{  mayHavePredictions && fixture.away_team_ug_points  }</div>
          </div>
        </div>
        <div className="text-x-small text-transform-initial">{ awayTeamGroupUsers }</div>
      </div>
    </div>
  )
}



export default Fixture
