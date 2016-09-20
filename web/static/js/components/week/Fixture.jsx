import React, { Component } from 'react'
import actions from '../../actions/actions'
// import { post, deleter } from '../rest_adapter'

// class Fixture extends Component {
//
//   predictionSelect(e) {
    // if (this.props.fixture.prediction) {
    //   deleter( `api/predictions/${this.props.fixture.prediction.id}`, null, this.props.session )
    //   this.props.dispatch( actions.removePrediction( this.props.fixture.id ) );
    //   return;
    // }
    // const prediction = {
    //   fixture_id: this.props.fixture.id,
    //   type: 'upset'
    // }
    // this.props.dispatch( actions.addPrediction( prediction ) );
    //
    // const predictionData = {
    //   prediction: prediction
    // }
    // post( 'api/predictions', null, this.props.session, JSON.stringify(predictionData) )
  // }


//
//   render() {
//     const { fixture } = this.props
//     if(!fixture.homeTeam){ return null; }
//     let homeTeamClasses = "split-list-view-left"
//     let awayTeamClasses = "split-list-view-right"
//     let homeTeamPointsClasses = "tag go-left"
//     let awayTeamPointsClasses = "tag go-right"
//
//     if( this.homeTeamPredictedWinner() ){
//       homeTeamClasses += " bg-green"
//       homeTeamPointsClasses += " tag-simple pulse"
//     }else{
//       awayTeamClasses += " bg-green"
//       awayTeamPointsClasses += " tag-simple pulse"
//     }
//
//     return(
//       <div className="split-list-view">
//         <div className={ homeTeamClasses } onClick={ this.predictionSelect.bind(this) }>
//           <span className={ homeTeamPointsClasses } > { this.homeTeamPointResult() } </span>
//           <span>{ fixture.homeTeam.name }</span>
//           <img src={ fixture.homeTeam.image } />
//         </div>
//         <div className={ awayTeamClasses } onClick={ this.predictionSelect.bind(this) }>
//           <img src={ fixture.awayTeam.image } />
//           <span>{ fixture.awayTeam.name }</span>
//           <span className={ awayTeamPointsClasses }> { this.awayTeamPointResult() } </span>
//         </div>
//       </div>
//     )
//   }
//
// }

function Fixture( {fixture, predictionSelect} ){
  if(!fixture.homeTeam){ return null; }
  let homeTeamClasses = "split-list-view-left"
  let awayTeamClasses = "split-list-view-right"
  let homeTeamPointsClasses = "tag go-left"
  let awayTeamPointsClasses = "tag go-right"

  if( homeTeamPredictedWinner( fixture ) ){
    homeTeamClasses += " bg-green"
    homeTeamPointsClasses += " tag-simple pulse"
  }else{
    awayTeamClasses += " bg-green"
    awayTeamPointsClasses += " tag-simple pulse"
  }

  return(
    <div className="split-list-view">
      <div className={ homeTeamClasses } onClick={ predictionSelect }>
        <span className={ homeTeamPointsClasses } > { homeTeamPointResult( fixture ) } </span>
        <span>{ fixture.homeTeam.name }</span>
        <img src={ fixture.homeTeam.image } />
      </div>
      <div className={ awayTeamClasses } onClick={ predictionSelect }>
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
