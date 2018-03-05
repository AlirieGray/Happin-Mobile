import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import eventsReducer from '../reducers/events';
import filtersReducer from '../reducers/filters';
import navReducer from '../reducers/navigation';
import authReducer from '../reducers/auth';
import currentEventReducer from '../reducers/currentEvent';
import userEventsReducer from '../reducers/userEvents';

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default () => {
  // Store creation
  const store = createStoreWithMiddleware(
    combineReducers({
      events: eventsReducer,
      currentEvent: currentEventReducer,
      userEvents: userEventsReducer,
      filters: filtersReducer,
      auth: authReducer,
      navigation: navReducer
    })
  );

  return store;
}
