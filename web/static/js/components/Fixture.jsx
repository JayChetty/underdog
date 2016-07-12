import React, { Component } from 'react'
import actions from '../actions/action'
import { post, deleter } from '../rest_adapter'

class Fixture extends Component {

  predictionSelect(e) {
    if (this.props.fixture.prediction) {
      deleter( `api/predictions/${this.props.fixture.prediction.id}`, null, this.props.session )
      this.props.dispatch( actions.removePrediction( this.props.fixture.id ) );
      return;
    }
    const prediction = {
      fixture_id: this.props.fixture.id,
      type: 'upset'
    }
    this.props.dispatch( actions.addPrediction( prediction ) );

    const predictionData = {
      prediction: prediction
    }
    post( 'api/predictions', null, this.props.session, JSON.stringify(predictionData) )
  }

  homeTeamFavourite(){
    return this.props.fixture.homeTeam.points >= this.props.fixture.awayTeam.points;
  }

  homeTeamPredictedWinner(){
    const output = this.homeTeamFavourite()
    return this.predictsUpset() ? !output : output;
  }

  predictsUpset(){
    const prediction = this.props.fixture.prediction
    return prediction && prediction.type === "upset"
  }

  predictsMauling(){
    const prediction = this.props.fixture.prediction
    return prediction && prediction.type === "maul"
  }

  homeTeamPointDifference(){
    const fixture = this.props.fixture;
    return fixture.homeTeam.points - fixture.awayTeam.points;
  }

  awayTeamPointDifference(){
    return this.homeTeamPointDifference() * -1
  }

  gamePointsForPointDifference( pointDifference ){
     return 3 + Math.max(0, pointDifference * -1 )
  }

  homeTeamPointResult(){
    return this.gamePointsForPointDifference( this.homeTeamPointDifference() )
  }

  awayTeamPointResult(){
    return this.gamePointsForPointDifference(  this.awayTeamPointDifference() )
  }

  render() {
    const { fixture } = this.props
    if(!fixture.homeTeam){
      return <div> ...loading Team Data</div>
    }
    let homeTeamClasses = "split-list-view-left"
    let awayTeamClasses = "split-list-view-right"
    let homeTeamPointsClasses = "tag go-left"
    let awayTeamPointsClasses = "tag go-right"

    if( this.homeTeamPredictedWinner() ){
      homeTeamClasses += " bg-green"
      homeTeamPointsClasses += " tag-simple"
    }else{
      awayTeamClasses += " bg-green"
      awayTeamPointsClasses += " tag-simple"
    }

    return(
      <div className="split-list-view">
        <div className={homeTeamClasses} onClick={ this.predictionSelect.bind(this) }>
          <span className={homeTeamPointsClasses} > {this.homeTeamPointResult()} </span>
          <span>{ fixture.homeTeam.name }</span>
          <img src={ fixture.homeTeam.image } />
        </div>
        <div className={awayTeamClasses} onClick={ this.predictionSelect.bind(this) }>
          <img src={ fixture.awayTeam.image } />
          <span>{ fixture.awayTeam.name }</span>
          <span className={awayTeamPointsClasses}> {this.awayTeamPointResult()} </span>
        </div>
      </div>
    )
  }

}

export default Fixture
