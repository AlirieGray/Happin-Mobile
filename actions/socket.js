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
  console.log("connect socket action")
  //console.log("Got socket: ", socket) // we have socket here
  return dispatch => {
    console.log("sending connect dispatch...")
    dispatch(addSocketConnection(socket))
  }
}

export function disconnectSocket() {
  return dispatch => {
    dispatch(removeSocketConnection())
  }
}
// party, volunteer, help, music, free, food, activism, game, art, social
