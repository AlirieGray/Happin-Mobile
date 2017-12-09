const currentEventReducerDefaultState = {};

export default (state = currentEventReducerDefaultState, action) => {
  switch (action.type) {
    case 'REQUEST_GET_EVENT_BY_ID':
      return state;
    case 'GET_EVENT_BY_ID_SUCCESS':
      return action.event;
    default:
      return state;
  }
}
