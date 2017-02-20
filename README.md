# Underdog
##API
/game is the main resource, the route return returns
- the weeks with all the games and the underdog game points
- the groups and the group users and their predictions
- the predictions for the main user


##Automated Data Updated
lib/underdog/result_runner
Application that provide functions to update results and fixture dates.
Here broadcasts to channels the game updates.
Automatically runs every 60 seconds.

Can call manually
mix run priv/updaters/date_updater.exs
mix run priv/updaters/result_updater.exs

##Frontend
React/Redux/Redux-Thunk.
Initial data pull (/game) gets all data and sets up state.
Group updates are done through channels.
Personal prediction updates are done through HTTP/REST(change this?).
