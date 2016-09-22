import "phoenix_html"

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import actions  from './actions/actions';

import requireAuth from './components/auth/RequireAuth';
import socket from "./socket";

import SignIn from './components/auth/SignIn';
import WeekContainer from './components/week/WeekContainer';

import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';

import {Router, Route, IndexRedirect, browserHistory} from 'react-router';


const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension(), applyMiddleware( thunk ));

window.onload = () => {

  let token = localStorage.getItem('ud_session');
  if (token !== null) {
      store.dispatch(actions.loginUserSuccess( token ));
      actions.fetchData( store.dispatch )
  }

  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/'>
            <IndexRedirect to='/weeks'/>
            <Route path='/login' component={ SignIn }/>
            <Route path='/weeks' component={ requireAuth( WeekContainer ) }/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById( 'app' )
  )

};
