export default (state = [], action) => {
  switch (action.type) {
    case 'REQUEST_USER_EVENTS':
      return state;
    case 'GET_USER_EVENTS_SUCCESS':
      return action.event;
    default:
      return state;
  }
}
