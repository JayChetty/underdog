import React from 'react';
import {Route, IndexRoute} from 'react-router';
import SignIn from '../components/auth/SignIn';
import WeekContainer from '../components/week/WeekContainer';
import requireAuth from '../components/auth/RequireAuth';

export default(
  <Route path='/'>
      {/*<IndexRoute component={HomeView}/>*/}
      <Route path='/login' component={ SignIn }/>
      <Route path='/weeks' component={ requireAuth( WeekContainer ) }/>
  </Route>
);
