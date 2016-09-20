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

import {Router, Route, browserHistory, IndexRedirect} from 'react-router';


const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension(), applyMiddleware( thunk ));

window.onload = () => {

  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={PredictionBox}/>
      </Router>
    </Provider>,
    document.getElementById( 'app' )
  )

};
