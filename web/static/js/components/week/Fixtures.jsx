import React, { Component } from 'react'
import Fixture from './Fixture'
import moment from 'moment';

function Fixtures( { className, isGameWeek, isInPast, fixtures, makePrediction, deletePrediction, predictions, matchesInPlay, groupUsers } ){

  let lastFixtureTime = moment("1995-12-25") //an early date
  let fixtureText = null

  const displayFixtures = fixtures.map( ( fixture ) => {
    let prediction = null;
    if ( predictions ) {
      prediction = predictions.find( (prediction) =>{ return prediction.fixture_id === fixture.id })
    }

    let startTime = moment(fixture.start_time)
    let dateDiv = null

    let dateClasses = "layout-align-self-center"
    if( startTime.isAfter(lastFixtureTime) ){
      dateDiv = (
      <div className="layout-align-self-center date">
        { startTime.format('ddd Do h:mma') }
      </div>)
      lastFixtureTime = startTime.clone()
    }

    return(
      <div key={fixture.id} className="layout-flex layout-flex-direction-column layout-align-items-stretch">
        { dateDiv }
        <Fixture
          fixture={fixture}
          makePrediction={ makePrediction }
          deletePrediction={ deletePrediction }
          isGameWeek={isGameWeek}
          isInPast={ isInPast }
          prediction={ prediction }
          matchesInPlay={matchesInPlay}
          groupUsers={ groupUsers }
        />

      </div>
    )

  })

  return (
    <div className={`text-up text-bolder scroll-y ${className}`}>
      { displayFixtures }
    </div>
  )
}

export default Fixtures
