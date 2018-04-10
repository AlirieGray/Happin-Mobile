import { CONNECT_SOCKET, DISCONNECT_SOCKET } from '../actions/socket';

export default (state = {socket: null}, action) => {
  switch (action.type) {
    case CONNECT_SOCKET:
      console.log("action in socket reducer CONNECT: ", action)
      console.log("received socket: ", action.socket)
      return {socket: action.socket};
    case DISCONNECT_SOCKET:
      console.log("calling disconnect reducer ", action)
      return {socket: null}
    default:
      return state;
  }
}
