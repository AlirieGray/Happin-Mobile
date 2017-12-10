import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import eventsReducer from '../reducers/events';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import currentEventReducer from '../reducers/currentEvent';

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default () => {
  // Store creation
  const store = createStoreWithMiddleware(
    combineReducers({
      events: eventsReducer,
      currentEvent: currentEventReducer,
      filters: filtersReducer,
      auth: authReducer
    })
  );

  return store;
}
