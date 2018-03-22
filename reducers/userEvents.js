import { GET_USER_EVENTS_SUCCESS, REQUEST_USER_EVENTS } from '../actions/events';

export default (state = [], action) => {
  switch (action.type) {
    case REQUEST_USER_EVENTS:
      return state;
    case GET_USER_EVENTS_SUCCESS:
      return [
        ...action.events
      ]
    default:
      return state;
  }
}
