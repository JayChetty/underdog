import "phoenix_html"

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import { createHistory } from 'history';
import reducer from './reducers/index';
import thunk from 'redux-thunk';
import actions  from './actions/actions';
import SignIn from './components/auth/SignIn';
import { Router, Route, browserHistory, IndexRedirect, IndexRoute } from 'react-router';
import requireAuth from './components/auth/RequireAuth';
import WeekContainer from './components/week/WeekContainer';
import socket from "./socket";

const routes = <div>
                <Route path='/login' component={ SignIn }/>
                <Route path='/weeks' component={ requireAuth( WeekContainer ) }/>
              </div>

const store = compose(
                applyMiddleware( thunk ),
                reduxReactRouter({
                  routes,
                  createHistory
                }),
                window.devToolsExtension && window.devToolsExtension()
              )( createStore )( reducer )
// const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension(), applyMiddleware( thunk ));

window.onload = () => {

  let token = localStorage.getItem('ud_session');
  if (token !== null) {
      store.dispatch(actions.loginUserSuccess(token));
  }

  ReactDOM.render(
    <Provider store={store}>
      <ReduxRouter>
        { routes }
      </ReduxRouter>
    </Provider>,
    document.getElementById( 'app' )
  )

  fetchData(store.dispatch)

};

function fetchData(dispatch){
  actions.getWeeks()( dispatch );
  actions.getFixtures()( dispatch );
  actions.getTeams()( dispatch );
}
