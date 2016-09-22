import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';
import routes from '../routes'
import { createHistory } from 'history';

export default function configureStore() {

  const store = compose(
    applyMiddleware( thunk ),
    reduxReactRouter({ routes, createHistory }),
    window.devToolsExtension && window.devToolsExtension()
  )( createStore )( reducer )

  return store

}
