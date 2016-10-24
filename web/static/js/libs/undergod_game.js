import _ from 'lodash'
import { findTeamById } from './league'

export function isHomeTeamPredictedWinner(fixture, weekNumber){
  const output = calcPointsDifference(fixture, weekNumber) >= 0
  return isUpsetPredicted(fixture.prediction) ? !output : output;
}

export function calcHomeTeamPointResult( fixture, weekNumber ){
  const pointsDiff = calcPointsDifference(fixture, weekNumber)
  return 3 + Math.max(0, pointsDiff * -1 )
}

export function calcAwayTeamPointResult( fixture, weekNumber ){
  const pointsDiff = calcPointsDifference(fixture, weekNumber) * -1
  return 3 + Math.max(0, pointsDiff * -1 )
}

export function calcPointsScoredForFixture( fixture, weekNumber){
  const homeTeamPredicted = isHomeTeamPredictedWinner(fixture, weekNumber)
  if( fixture.home_team_score > fixture.away_team_score && homeTeamPredicted  ){
    return calcHomeTeamPointResult(fixture, weekNumber)
  }else if( fixture.home_team_score < fixture.away_team_score && !homeTeamPredicted  ){
    return calcAwayTeamPointResult(fixture, weekNumber)
  }
  return 0
}

export function calcTotalUserPoints( weeks, teams ) {
  const mapPoints = weeks.map( week => calcTotalWeekUserPoints( week, teams, { predicted: false } ))
  const totalUserPoints = _.sum( mapPoints )
  return totalUserPoints
}

export function calcTotalWeekUserPoints( week, teams, options ) {
  const pointsForFixtures = week.fixtures.map((fixture)=>{
    const homeTeam = findTeamById(teams, fixture.home_team_id)
    const awayTeam = findTeamById(teams, fixture.away_team_id)
    const fixtureWithTeams = Object.assign( {}, fixture, {homeTeam: homeTeam, awayTeam:awayTeam} )
    if(options.predicted){
      return calcPointsPredictedForFixture(fixtureWithTeams, week.number)
    }
    return calcPointsScoredForFixture(fixtureWithTeams, week.number)
  })
  return _.sum(pointsForFixtures)
}

export function calcPointsPredictedForFixture( fixture, weekNumber){
  const homeTeamPredicted = isHomeTeamPredictedWinner(fixture, weekNumber)
  if(homeTeamPredicted){
    return calcHomeTeamPointResult(fixture, weekNumber)
  }else{
    return calcAwayTeamPointResult(fixture, weekNumber)
  }
}

export function calcGameWeekIndex( weekFixtures ) {
  if ( weekFixtures.length === 0 ) { return null; }

  const dateToday = Date.now();

  const gameWeek = weekFixtures.findIndex( function( weekFixture, index, array ) {
    if ( index === array.length-1 ) { return true }

    const dateFrom = Date.parse( weekFixture.start_date )
    const dateTo = Date.parse( array[index+1].start_date )

    if ( dateToday > dateFrom && dateToday < dateTo ) {
      console.log("date from", weekFixture.start_date)
      console.log("date to", array[index+1].start_date )
      return true;
    }

  })
  return gameWeek + 1
}

function calcCumulativePoints(points, weekNumber){
 const pointsToWeek = points.slice(0, weekNumber-1)
 return _.sum( pointsToWeek )
}

function isUpsetPredicted(prediction){
  return prediction && prediction.type === "upset"
}

function isMaulingPredicted(prediction){
  return prediction && prediction.type === "maul"
}

function calcPointsDifference(fixture, weekNumber){
  const homeTeamPoints = calcCumulativePoints( fixture.homeTeam.points, weekNumber )
  const awayTeamPoints = calcCumulativePoints( fixture.awayTeam.points, weekNumber)
  return homeTeamPoints - awayTeamPoints;
}
