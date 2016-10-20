import "phoenix_html"

import socket from "./socket";

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import actions  from './actions/actions';
import reducer from './reducers/index';

import AppContainer from './components/AppContainer';

import requireAuth from './components/auth/RequireAuth';
import SignIn from './components/auth/SignIn';
import WeekContainer from './components/week/WeekContainer';
import GroupsList from './components/groups/GroupsList';
import Group from './components/groups/Group';




const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension(), applyMiddleware( thunk ));

window.onload = () => {

  let token = localStorage.getItem('ud_session');
  if (token !== null) {
    store.dispatch(actions.loginUserSuccess( token ));
    actions.fetchData( store.dispatch, token )
  }

  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/login' component={SignIn}/>
        <Route path='/' component={AppContainer}>
          <IndexRedirect to='/weeks'/>
          <Route path='/weeks' component={ requireAuth( WeekContainer ) }/>
          <Route path='/groups' component={ requireAuth( GroupsList ) }/>
          <Route path='/groups/:groupId' component={Group} view="detail"/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById( 'app' )
  )

};
