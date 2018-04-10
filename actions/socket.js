export const CONNECT_SOCKET = 'CONNECT';
export const DISCONNECT_SOCKET = 'DISCONNECT';

export const addSocketConnection = (socket) => ({
  type: CONNECT_SOCKET,
  socket
})

export const removeSocketConnection = () => ({
  type: DISCONNECT_SOCKET
})

export function connectSocket(socket) {
  return dispatch => {
    dispatch(addSocketConnection(socket))
  }
}

export function disconnectSocket() {
  return dispatch => {
    dispatch(removeSocketConnection())
  }
}
// party, volunteer, help, music, free, food, activism, game, art, social
