import {
  GET_USER_EVENTS_SUCCESS,
  REQUEST_USER_EVENTS } from '../actions/events';

export default (state = {attending: [], created: [], isFetching: true}, action) => {
  switch (action.type) {
    case REQUEST_USER_EVENTS:
      return {
        ...state,
        isFetching: true
      }
    case GET_USER_EVENTS_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        created: [...action.created],
        attending: [...action.attending]
      }
    default:
      return state;
  }
}
