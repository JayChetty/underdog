import "phoenix_html"

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';
import actions  from './actions/actions';
import SignIn from './components/auth/SignIn';
import {Router, Route, browserHistory, IndexRedirect, IndexRoute} from 'react-router';

// import PredictionBox from './components/PredictionBox';

import WeekContainer from './components/week/WeekContainer';


import socket from "./socket"
const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension(), applyMiddleware( thunk ));

window.onload = () => {


  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/login' component={ SignIn }/>
        <Route path='/weeks' component={ WeekContainer }/>
      </Router>
    </Provider>,
    document.getElementById( 'app' )
  )

  fetchData(store.dispatch)

};

function fetchData(dispatch){
  actions.getWeeks()( dispatch );
  actions.getFixtures()( dispatch );
  actions.getTeams()( dispatch );
  // if(this.props.session){
  //    actions.getPredictions()( dispatch, this.props.session );
  // }
}
