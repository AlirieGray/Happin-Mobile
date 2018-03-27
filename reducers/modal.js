
export default (state = {
  createEventModal: false,
  searchModal: false
}, action) => {
  switch (action.type) {
    case 'SET_CREATE_EVENT_MODAL':
      return {
        ...state,
        createEventModal: action.visible
      }
    case 'SET_SEARCH_MODAL':
      return {
        ...state,
        searchModal: action.visible
      }
    default:
      return state;
  }
}
