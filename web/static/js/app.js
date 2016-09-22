import "phoenix_html"

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import actions  from './actions/actions';
import routes from './routes'
import requireAuth from './components/auth/RequireAuth';
import socket from "./socket";
import configureStore from './store/configureStore'

const store = configureStore();
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
