import React from 'react'
import _ from 'lodash'
import {pointsScoredForFixture, pointsPredictedForFixture} from '../../game_library/points_calculator'

function FixturesSummary(props){
  let body = null
  if(!props.displayWeek){return null}
  const displayWeekNumber = props.displayWeek.number
  if( displayWeekNumber < props.gameWeekNumber){
    body = (
      <div>
        <div className="text-blue">POINTS SCORED</div>
        <div className="text-bold text-large">{ totalPoints(props.displayWeek, props.teams, {predicted: false}) }</div>
      </div>
    )
  }else if( displayWeekNumber === props.gameWeekNumber){
    body = (
      <div>
        <div className="text-blue">POTENTIAL POINTS</div>
        <div className="text-bold text-large">{ totalPoints(props.displayWeek, props.teams, {predicted: true}) }</div>
      </div>
    )
  }
  return (
    <footer className="layout-footer">
      { body }
    </footer>
  )
}

function findTeamById(teams, teamId){
  return _.find(teams, (team) => team.id === teamId )
}


function totalPoints( week, teams, options ) {
  const pointsForFixtures = week.fixtures.map((fixture)=>{
    const homeTeam = findTeamById(teams, fixture.home_team_id)
    const awayTeam = findTeamById(teams, fixture.away_team_id)
    const fixtureWithTeams = Object.assign( {}, fixture, {homeTeam: homeTeam, awayTeam:awayTeam} )
    if(options.predicted){
      return pointsPredictedForFixture(fixtureWithTeams, week.number)
    }
    return pointsScoredForFixture(fixtureWithTeams, week.number)
  })
  return _.sum(pointsForFixtures)
}

export default FixturesSummary
