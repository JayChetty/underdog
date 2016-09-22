import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';
import routes from './routes'
import { createHistory } from 'history';

export function configureStore = {

  return compose(
    applyMiddleware( thunk ),
    reduxReactRouter({ routes, createHistory }),
    window.devToolsExtension && window.devToolsExtension()
  )( createStore )( reducer )

}
