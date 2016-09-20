import "phoenix_html"

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';
import actions  from './actions/actions';
// import AuthContainer from './components/auth/AuthContainer';
import PredictionBox from './components/PredictionBox';

const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension(), applyMiddleware( thunk ));

window.onload = () => {

  ReactDOM.render(
    <Provider store={store}>
      <PredictionBox/>
    </Provider>,
    document.getElementById( 'app' )
  )

};
