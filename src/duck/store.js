import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// applyMiddleware for redux import if I use the promise middleware
// import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './userReducer';
import tripReducer from './tripReducer';
import pictureReducer from './pictureReducer';

const rootReducer = combineReducers({
  user: userReducer,
  trip: tripReducer,
  picture: pictureReducer,
});

export default createStore(rootReducer, composeWithDevTools());

// , applyMiddleware(promiseMiddleware)
