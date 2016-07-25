import "phoenix_html"

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PredictorApp from './reducers/reducer';
// import PredictionBox from './components/PredictionBox';
import actions  from './actions/action';
import AuthContainer from './components/auth/AuthContainer';

let store = createStore(PredictorApp, window.devToolsExtension && window.devToolsExtension());

window.onload = () => {
  // ReactDOM.render(
  //   <Provider store={store}>
  //     <PredictionBox />
  //   </Provider>,
  //   document.getElementById( 'app' )
  // )
  // <SignIn url="api/sessions" store={store}/>
  ReactDOM.render(
    <Provider store={store}>
      <AuthContainer/>
    </Provider>,
    document.getElementById( 'app' )
  )

};
