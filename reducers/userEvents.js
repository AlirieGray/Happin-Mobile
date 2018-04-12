import {
  GET_CREATED_EVENTS_SUCCESS,
  GET_ATTENDING_EVENTS_SUCCESS,
  REQUEST_USER_EVENTS } from '../actions/events';

export default (state = {attending: [], created: [], isFetching: true}, action) => {
  switch (action.type) {
    case REQUEST_USER_EVENTS:
      return {
        ...state,
        isFetching: true
      }
    case GET_CREATED_EVENTS_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        created: [...action.events]
      }
    case GET_ATTENDING_EVENTS_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        attending: [...action.events]
      }
    default:
      return state;
  }
}
