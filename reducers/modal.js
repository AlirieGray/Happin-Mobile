
export default (state = {
  createEventModal: false
}, action) => {
  switch (action.type) {
    case 'SET_CREATE_EVENT_MODAL':
      return {
        createEventModal: action.visible
      }
    default:
      return state;
  }
}
