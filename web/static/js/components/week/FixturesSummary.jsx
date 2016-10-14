import React from 'react'
import _ from 'lodash'
import {pointsScoredForFixture} from '../../game_library/points_calculator'

function FixturesSummary(props){
  return (
    <footer className="layout-footer">
      <div className="text-blue">POINTS SCORED</div>
      <div className="text-bold text-large">{ calculatePredictedPoints(props.displayWeek, props.teams) }</div>
    </footer>
  )
}

function calculatePotentialPoints(){

}

function findTeamById(teams, teamId){
  return _.find(teams, (team) => team.id === teamId )
}



function calculatePredictedPoints( week, teams ) {
  if(!week){return 0}
  console.log("week", week)
  const pointsForFixtures = week.fixtures.map((fixture)=>{
    console.log('fixture', fixture)
    const homeTeam = findTeamById(teams, fixture.home_team_id)
    const awayTeam = findTeamById(teams, fixture.away_team_id)
    const fixtureWithTeams = Object.assign( {}, fixture, {homeTeam: homeTeam, awayTeam:awayTeam} )
    return pointsScoredForFixture(fixtureWithTeams, week.number)
  })
  console.log("pointsForFixtures", pointsForFixtures)
  return _.sum(pointsForFixtures)
  // if (!weekFixtures) { return 0 }
  // // const weekFixtures = filterFixturesByWeekId( weekId, fixtures )
  // const points = weekFixtures.fixtures.map( ( fixture ) => {
  //   if( fixture.prediction && fixture.homeTeam) {
  //     const pointsDifference = fixture.homeTeam.points - fixture.awayTeam.points
  //     return ( Math.abs( pointsDifference ) + 3 )
  //   }
  //   return 3
  // })
  // const total = points.reduce( ( prev, curr ) => prev + curr, 0 )
  // return total
}

export default FixturesSummary
