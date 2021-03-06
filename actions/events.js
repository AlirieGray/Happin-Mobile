import serverPath from '../paths';
import { NavigationActions } from 'react-navigation';
export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';
export const ADD_EVENT_FAILURE = 'ADD_EVENT_FAILURE';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const EDIT_EVENT = 'EDIT_EVENT';
export const REQUEST_GET_EVENTS = 'REQUEST_GET_EVENTS';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';
export const REQUEST_GET_EVENT_BY_ID = 'REQUEST_GET_EVENT_BY_ID';
export const GET_EVENT_BY_ID_SUCCESS = 'GET_EVENT_BY_ID_SUCCESS';
export const REQUEST_USER_EVENTS = 'REQUEST_USER_EVENTS';
export const GET_USER_EVENTS_SUCCESS = 'GET_USER_EVENTS_SUCCESS';

export const requestAddEvent = () => ({
  type: REQUEST_GET_EVENTS,
  isFetching: true
})

export const receiveAddEvent = ({name, _id, date, address, placeId, organizer, description, dateFormatted, lat, lng, attendeeCount, tags}) =>({
  type: ADD_EVENT_SUCCESS,
  _id, date, name,
  address, placeId,
  organizer, description,
  dateFormatted, lat, lng,
  attendeeCount, tags
})

export const addEventError = (message) => ({
  type: ADD_EVENT_FAILURE,
  isFetching: false,
  message
})

// REMOVE_EVENT
export const removeEvent = ({ id }) => ({
  type: REMOVE_EVENT,
  id
});

// EDIT_EVENT
export const editEvent = (id, updates) => ({
  type: EDIT_EVENT,
  id,
  updates
})

// GET EVENTS
export const requestGetEvents = () => ({
  type: REQUEST_GET_EVENTS,
  isFetching: true,
})

export const receiveEvents = (events) => ({
  type: GET_EVENTS_SUCCESS,
  isFetching: false,
  events
})

export const getEventsError = (message) => ({
  type: GET_EVENTS_FAILURE,
  isFetching: false,
  message
})

export const requestUserEvents = () => ({
  type: REQUEST_USER_EVENTS,
  isFetching: true,
})

export const receiveUserEvents = (created, attending) => ({
  type: GET_USER_EVENTS_SUCCESS,
  created, attending
})

export const requestGetEventById = (id) => ({
  type: REQUEST_GET_EVENT_BY_ID,
  isFetching: true,
})

export const receiveEventById = (event) => ({
  type: GET_EVENT_BY_ID_SUCCESS,
  isFetching: false,
  event
})

////**** SOCKET ACTIONS ****////
export function addHap(hap) {
  return dispatch => {
    dispatch(receiveAddEvent(hap));
  }
}

export function createNewHapSocket(socket, hap) {
  return dispatch => {
    socket.emit('New Hap', {hap});
  }
}

export function joinHapSocket(socket, hapId, userId) {
  return dispatch => {
    socket.emit('Join Hap', {hapId, userId});
  }
}

export function leaveHapSocket(socket, hapId, userId) {
  return dispatch => {
    socket.emit('Leave Hap', {hapId, userId});
  }
}

export function getEventById(id) {
  console.log("fetching events from database...");
  let config = {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded' }
  }

  return dispatch => {
     dispatch(requestGetEventById());

    return fetch(`${serverPath}/events/${id}`, config).then((res) => {
      if (res.status !== 200) {
        dispatch(getEventsError("Error: Could not fetch event by ID from database: " + res.message));
        return Promise.reject("Could not fetch events from database");
      }
      return res.json();
    }).then((event) => {
      dispatch(receiveEventById(event));
    }).catch(err => console.log(err));
  }
}

export function getUserEvents(userId) {
  let config = {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded' }
  }

  return dispatch => {
    dispatch(requestUserEvents());
    console.log("REQUESTING USER EVENTS")
    return fetch(`${serverPath}/users/${userId}/events`, config).then((res) => {
      if (res.status !== 200) {
        dispatch(getEventsError("Error: Could not fetch events for this user from database: " + res.message));
        return Promise.reject("Error: Could not fetch events for this user from database")
      }
      return res.json();
    }).then(({ created, attending }) => {
        console.log("created: ", created)
        console.log("attending: ", attending)
        dispatch(receiveUserEvents(created, attending));
    }).catch(err => console.log(err))
  }
}

export function getEvents() {
  let config = {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded' }
  }

  return dispatch => {
    dispatch(requestGetEvents());

    return fetch(`${serverPath}/events`, config).then((res) => {
      if (res.status != 200) {
        dispatch(getEventsError("Error: Could not fetch events index from database: " + res.statusText));
        return Promise.reject("Error: Could not fetch events index from database");
      }
      return res.json();
    }).then((  events  ) => {
      dispatch(receiveEvents(events));
    }).catch(err => console.log(err));
  }
}

export function addEvent(event) {
  const tags = event.tags.toString();
  let config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded' },
    body: `name=${event.name}&date=${event.date}&placeId=${event.placeId}&address=${event.address}&description=${event.description}&lat=${event.lat}&lng=${event.lng}&userId=${event.userId}&tags=${tags}`
  }

  return (dispatch, getState) => {
    dispatch(requestAddEvent(event));

    return fetch(`${serverPath}/events/new`, config).then((res) => {
      if (res.status !== 200) {
        dispatch(addEventError(res.statusText));
        return Promise.reject(res.message);
      }
      return res.json();
    }).then(({_id, name, date, address, placeId, lat, lng, description, organizer, tags}) => {
      dispatch(receiveAddEvent({
        _id, name, address, placeId, date, lat, lng, description, organizer, tags
      }))

      // navigate to the event's page and TODO: close modal *******
      dispatch(NavigationActions.navigate({routeName: 'EventPage', params: { id:_id, lat, lng, name }}));

    }).catch(err => console.log(err));
  }
}
