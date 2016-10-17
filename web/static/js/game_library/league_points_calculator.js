export function calculatePoints(teamId, weeks){
  return weeks.map((week)=>{
    const teamFixture = week.fixtures.find((fixture)=>{
      return fixture.home_team_id === teamId || fixture.away_team_id === teamId
    })
    return pointsForGame(teamFixture, teamId)
  })
}


function pointsForGame(fixture, teamId){
  const homeTeamWon = fixture.home_team_score > fixture.away_team_score
  const awayTeamWon = fixture.away_team_score > fixture.home_team_score
  const isHomeTeam = fixture.home_team_id === teamId
  const isAwayTeam = fixture.away_team_id === teamId
  if( !isHomeTeam && !isAwayTeam){return false}

  if( (isHomeTeam && homeTeamWon) || (isAwayTeam && awayTeamWon) ){
    return 3
  }
  if( (isHomeTeam && awayTeamWon) || (isAwayTeam && homeTeamWon) ){
    return 0
  }

  return 1
}
