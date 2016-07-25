import "phoenix_html"

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import PredictorApp from './reducers/reducer';
import thunk from 'redux-thunk'
// import PredictionBox from './components/PredictionBox';
import actions  from './actions/actions';
import AuthContainer from './components/auth/AuthContainer';

const store = createStore(PredictorApp, window.devToolsExtension && window.devToolsExtension(), applyMiddleware( thunk ));

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
