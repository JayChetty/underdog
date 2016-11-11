import "phoenix_html"

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Router, Route, IndexRedirect, browserHistory, Redirect} from 'react-router';
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
import GroupPredictions from './components/groups/GroupPredictions';
import GroupChat from './components/groups/GroupChat';
import {Socket} from "phoenix"

export const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension(), applyMiddleware( thunk ));

const initRender = ( gameWeekIndex ) => {

  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/login' component={SignIn}/>
        <Route path='/' component={AppContainer}>
          <IndexRedirect to={`/weeks/${gameWeekIndex}`}/>
          <Route path='/weeks/:id' component={ requireAuth( WeekContainer ) }/>
          <Route path='/groups' component={ requireAuth( GroupsList ) } />
          <Route path='/groups/:groupId/chat' component={ requireAuth( GroupChat ) }/>
          <Route path='/groups/:groupId/weeks/:displayWeekIndex' component={ requireAuth( GroupPredictions ) }/>
          <Route path='/groups/:groupId/table' component={ requireAuth( GroupTable ) }/>
          <Route path='/weeks/:id/users/:userId' component={ requireAuth( WeekContainer ) }/>
        </Route>
        <Redirect from="*" to="/"/>
      </Router>
    </Provider>,
    document.getElementById( 'app' )
  )

  // const body = document.body;
  // const nav = document.querySelector( "nav" );
  // const aside = document.querySelector( "aside" );
  // const main = document.querySelector( "main" );
  //
  // nav.className = "";
  // aside.className = "";
  // main.className = "";
  //
  // body.onscroll = (e) => {
  //   if ( body.scrollTop > 45 ) {
  //     nav.className = "navbar-sticky";
  //     aside.className = "aside-sticky";
  //     main.className = "main-sticky";
  //   } else {
  //     nav.className = "";
  //     aside.className = "";
  //     main.className = "";
  //   }
  // }

};

export { initRender };

window.onload = () => {

  if(!window.isCordovaApp){//cordova will call start itself apis are loaded
    window.start()
  }

};

window.start = function(){
  let session = JSON.parse( localStorage.getItem('ud_session') );
  if (session !== null) {
    store.dispatch(actions.loginUserSuccess( session ));
    actions.getGame()( store.dispatch, session.jwt, false );
  } else {
    const gameWeekIndex = store.getState( "predictions" ).predictions.gameWeekIndex
    initRender(gameWeekIndex);
  }
}
