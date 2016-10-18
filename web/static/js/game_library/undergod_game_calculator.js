import _ from 'lodash'

export function isHomeTeamPredictedWinner(fixture, weekNumber){
  const output = calcPointsDifference(fixture, weekNumber) >= 0
  return isUpsetPredicted(fixture.prediction) ? !output : output;
}

export function calcHomeTeamPointResult( fixture, weekNumber ){
  const pointsDiff = calcPointsDifference(fixture, weekNumber)
  return calcGamePointsForPointDifference( pointsDiff )
}

export function calcAwayTeamPointResult( fixture, weekNumber ){
  const pointsDiff = calcPointsDifference(fixture, weekNumber) * -1
  return calcGamePointsForPointDifference( pointsDiff )
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

function findTeamById(teams, teamId){
  return _.find(teams, (team) => team.id === teamId )
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

function calcGamePointsForPointDifference( pointDifference ){
   return 3 + Math.max(0, pointDifference * -1 )
}
