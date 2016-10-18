import _ from 'lodash'

export function homeTeamPredictedWinner(fixture, weekNumber){
  const output = pointsDifference(fixture, weekNumber) >= 0
  return predictsUpset(fixture.prediction) ? !output : output;
}

export function homeTeamPointResult( fixture, weekNumber ){
  const pointsDiff = pointsDifference(fixture, weekNumber)
  return gamePointsForPointDifference( pointsDiff )
}

export function awayTeamPointResult( fixture, weekNumber ){
  const pointsDiff = pointsDifference(fixture, weekNumber) * -1
  return gamePointsForPointDifference( pointsDiff )
}

export function pointsScoredForFixture( fixture, weekNumber){
  const homeTeamPredicted = homeTeamPredictedWinner(fixture, weekNumber)
  if( fixture.home_team_score > fixture.away_team_score && homeTeamPredicted  ){
    return homeTeamPointResult(fixture, weekNumber)
  }else if( fixture.home_team_score < fixture.away_team_score && !homeTeamPredicted  ){
    return awayTeamPointResult(fixture, weekNumber)
  }
  return 0
}

export function totalPoints( weeks, teams ) {
  const mapPoints = weeks.map( ( week ) => {
    return weekPoints( week, teams, { predicted: false } )
  })
  const points = mapPoints.reduce((prev, curr) => { return prev + curr }, 0)
  return points
}

export function weekPoints( week, teams, options ) {
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

export function pointsPredictedForFixture( fixture, weekNumber){
  const homeTeamPredicted = homeTeamPredictedWinner(fixture, weekNumber)
  if(homeTeamPredicted){
    return homeTeamPointResult(fixture, weekNumber)
  }else{
    return awayTeamPointResult(fixture, weekNumber)
  }
}

function findTeamById(teams, teamId){
  return _.find(teams, (team) => team.id === teamId )
}

function cumulativePoints(points, weekNumber){
 const pointsToWeek = points.slice(0, weekNumber-1)
 return _.sum( pointsToWeek )
}

function predictsUpset(prediction){
  return prediction && prediction.type === "upset"
}

function predictsMauling(prediction){
  return prediction && prediction.type === "maul"
}

function pointsDifference(fixture, weekNumber){
  const homeTeamPoints = cumulativePoints( fixture.homeTeam.points, weekNumber )
  const awayTeamPoints = cumulativePoints( fixture.awayTeam.points, weekNumber)
  return homeTeamPoints - awayTeamPoints;
}

function gamePointsForPointDifference( pointDifference ){
   return 3 + Math.max(0, pointDifference * -1 )
}
