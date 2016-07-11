// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PredictorApp from './reducers/reducer';
import PredictionBox from './components/PredictionBox';
import actions  from './actions/action'

// let store = createStore( PredictorApp );

let store = createStore(PredictorApp, window.devToolsExtension && window.devToolsExtension());

window.onload = () => {

  var XHR = (url, callback) => {
    var request = new XMLHttpRequest();
    request.open( "GET", url );
    request.onload = () => {
      if( request.status === 200 ) {
        let receivedJson = JSON.parse( request.responseText )
        console.log('got data', receivedJson)
        // store.dispatch( actions.setFixtures( receivedJson.data ) )
        callback( receivedJson.data )
      }
    }
    request.send( null );
  }

  XHR("/api/seasons/1/fixtures", (data)=>{
    store.dispatch( actions.setFixtures( data ) )
  });

  XHR("/api/teams", (data)=>{
    store.dispatch( actions.setTeams( data ) )
  });

  ReactDOM.render(
    <Provider store={store}>
      <PredictionBox />
    </Provider>,
    document.getElementById( 'app' )
  )

};
