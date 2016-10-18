import _ from "lodash"

export function calcPointsForTeam(teamId, weeks){
  return weeks.map((week)=>{
    const teamFixture = week.fixtures.find((fixture)=>{
      return fixture.home_team_id === teamId || fixture.away_team_id === teamId
    })
    return calcPointsForGame(teamFixture, teamId)
  })
}

export function findTeamById(teams, teamId){
  return _.find(teams, (team) => team.id === teamId )
}

function isNotPlayed( fixture ) {
  return fixture.home_team_score === null || fixture.away_team_score === null
}

function calcPointsForGame(fixture, teamId){
  if ( isNotPlayed( fixture ) ) { return 0 }
  const homeTeamWon = fixture.home_team_score > fixture.away_team_score
  const awayTeamWon = fixture.away_team_score > fixture.home_team_score
  const isHomeTeam = fixture.home_team_id === teamId
  const isAwayTeam = fixture.away_team_id === teamId

  if( (isHomeTeam && homeTeamWon) || (isAwayTeam && awayTeamWon) ){
    return 3
  }
  if( (isHomeTeam && awayTeamWon) || (isAwayTeam && homeTeamWon) ){
    return 0
  }
  return 1
}
