
export const setCreateEventModal = (visible) => ({
  type: 'SET_CREATE_EVENT_MODAL',
  visible
})

export function openCreateEventModal() {
  console.log("calling open create event modal action")
  return dispatch => {
    dispatch(setCreateEventModal(true))
  }
}

export function closeCreateEventModal() {
  return dispatch => {
    dispatch(setCreateEventModal(false))
  }
}
