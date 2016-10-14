export function homeTeamPredictedWinner(fixture, weekNumber){
  const output = homeTeamPointDifference(fixture, weekNumber) >= 0
  return predictsUpset(fixture.prediction) ? !output : output;
}

export function homeTeamPointResult( fixture, weekNumber ){
  return gamePointsForPointDifference( homeTeamPointDifference(fixture, weekNumber) )
}

export function awayTeamPointResult( fixture, weekNumber ){
  return gamePointsForPointDifference( homeTeamPointDifference(fixture, weekNumber) * -1 )
}

export function pointsScoredForFixture( fixture, weekNumber){
  const homeTeamPredicted = homeTeamPredictedWinner(fixture, weekNumber)
  console.log('fixture', fixture)
  if( fixture.home_team_score > fixture.away_team_score && homeTeamPredicted  ){
    return homeTeamPointResult(fixture, weekNumber)
  }else if( fixture.home_team_score < fixture.away_team_score && !homeTeamPredicted  ){
    return awayTeamPointResult(fixture, weekNumber)
  }
  return 0
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

function homeTeamPointDifference(fixture, weekNumber){
  const homeTeamPoints = cumulativePoints( fixture.homeTeam.points, weekNumber )
  const awayTeamPoints = cumulativePoints( fixture.awayTeam.points, weekNumber)
  return homeTeamPoints - awayTeamPoints;
}


function gamePointsForPointDifference( pointDifference ){
   return 3 + Math.max(0, pointDifference * -1 )
}
