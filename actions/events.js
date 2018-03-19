import serverPath from '../paths';
import { NavigationActions } from 'react-navigation';

export const requestAddEvent = () => ({
  type: 'REQUEST_GET_EVENTS',
  isFetching: true
})

export const receiveAddEvent = ({name, _id, date, address, placeId, organizer}) =>({
  type: 'ADD_EVENT_SUCCESS',
  id: _id,
  date, name,
  address, placeId,
  organizer
})

export const addEventError = (message) => ({
  type: 'ADD_EVENT_FAILURE',
  isFetching: false,
  message
})

// REMOVE_EVENT
export const removeEvent = ({ id }) => ({
  type: 'REMOVE_EVENT',
  id
});

// EDIT_EVENT
export const editEvent = (id, updates) => ({
  type: 'EDIT_EVENT',
  id,
  updates
})

// GET EVENTS
export const requestGetEvents = () => ({
  type: 'REQUEST_GET_EVENTS',
  isFetching: true,
})

export const receiveEvents = (events) => ({
  type: 'GET_EVENTS_SUCCESS',
  isFetching: false,
  events
})

export const getEventsError = (message) => ({
  type: 'GET_EVENTS_FAILURE',
  isFetching: false,
  message
})

export const requestGetEventById = (id) => ({
  type: 'REQUEST_GET_EVENT_BY_ID',
  isFetching: true,
})

export const receiveEventById = (event) => ({
  type: 'GET_EVENT_BY_ID_SUCCESS',
  isFetching: false,
  event
})

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
      console.log(event)
      dispatch(receiveEventById(event));
    }).catch(err => console.log("Error: " + err));
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
    dispatch(requestGetEvents());

    return fetch(`${serverPath}/users/${userId}/events`, config).then((res) => {
      if (res.status !== 200) {
        dispatch(getEventsError("Error: Could not fetch events for this user from database: " + res.message));
        return Promise.reject("Error: Could not fetch events for this user from database")
      }
      return res.json();
    }).then(({ events }) => {
        dispatch(receiveEvents(events));
    }).catch(err => console.log("Error: " + err))
  }
}

export function getEvents() {
  console.log("fetching events from database...");
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
    }).then(( { events } ) => {
      console.log("got events index ", events)
      dispatch(receiveEvents(events));
    }).catch(err => console.log("Error: " + err));
  }
}

export function addEvent(event) {
  console.log("attempting to add event...")
  console.log(event)
  let config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded' },
    body: `name=${event.name}&date=${event.date}&placeId=${event.placeId}&address=${event.address}&description=${event.description}&lat=${event.lat}&lng=${event.lng}&userId=${event.userId}`
  }

  return (dispatch, getState) => {
    dispatch(requestAddEvent(event));
    console.log("requested add event")

    return fetch(`${serverPath}/events/new`, config).then((res) => {
      if (res.status != 200) {
        dispatch(addEventError(res.statusText));
        return Promise.reject(res.message);
      }
      return res.json();
    }).then(({_id, name, date, address, placeId, lat, lng, description, organizer}) => {
      dispatch(receiveAddEvent({
        _id, name, address, placeId, date, lat, lng, description, organizer
      }))
      // navigate to the event's page and clear event form from nav history
      dispatch(NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'EventsList' }),
          NavigationActions.navigate({routeName: 'EventPage', params: { id:_id, lat, lng }})
        ]
      }))

    }).catch(err => console.log("Error: " + err));
  }
}
