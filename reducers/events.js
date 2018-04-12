import { ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  REMOVE_EVENT,
  EDIT_EVENT,
  REQUEST_GET_EVENTS,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE
} from '../actions/events';

export default (state = [], action) => {
  switch (action.type) {
    case REQUEST_GET_EVENTS:
      return state;
    case GET_EVENTS_SUCCESS:
      return [
        ...action.events
      ];
    case GET_EVENTS_FAILURE:
      return {
        errorMessage: action.message
      }
    case ADD_EVENT_SUCCESS:
      return [...state,
        {
          _id: action._id,
          date: action.date,
          dateFormatted: action.dateFormatted,
          name: action.name,
          address: action.address,
          placeId: action.placeId,
          lat: action.lat,
          lng: action.lng,
          description: action.description,
          organizer: action.organizer,
          tags: action.tags,
          attendees: action.attendees,
          attendeeCount: action.attendeeCount
        }];
    case REMOVE_EVENT:
      return state.filter(({ id }) => id !== action.id);
    case EDIT_EVENT:
      return state.map( (event) => {
        if (event.id === action.id) {
          return {
            ...event,
            ...action.updates
          }
        } else {
          return event;
        }
      });
    default:
      return state;
  }
}
