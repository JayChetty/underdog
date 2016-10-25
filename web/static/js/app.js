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
import GroupTable from './components/groups/GroupTable';
import GroupChat from './components/groups/GroupChat';
import {Socket} from "phoenix"


const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension(), applyMiddleware( thunk ));

const initRender = () => {
  console.log( "init rendered" )

  const weekIndex = store.getState( "predictions" ).predictions.gameWeekIndex

  // let socket = new Socket("/socket", {params: {token: window.userToken}})
  // socket.connect()
  //
  // let channel = socket.channel("group:6", {})
  // channel.join()
  //   .receive("ok", resp => { console.log("Joined successfully", resp) })
  //   .receive("error", resp => { console.log("Unable to join", resp) })

  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/login' component={SignIn}/>
        <Route path='/' component={AppContainer}>
          <IndexRedirect to={`/weeks/${weekIndex}`}/>
          <Route path='/weeks/:id' component={ requireAuth( WeekContainer ) }/>
          <Route path='/groups' component={ requireAuth( GroupsList ) }/>
          <Route path='/groups/:groupId' component={ requireAuth( GroupChat ) }/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById( 'app' )
  )

};

export default initRender;

window.onload = () => {
  let session = JSON.parse( localStorage.getItem('ud_session') );
  if (session !== null) {
    store.dispatch(actions.loginUserSuccess( session ));
    actions.fetchData( store.dispatch, session.jwt )
  } else {
    initRender();
  }
};
