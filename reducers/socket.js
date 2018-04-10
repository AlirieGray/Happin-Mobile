import { CONNECT_SOCKET, DISCONNECT_SOCKET } from '../actions/socket';

export default (state = {socket: null}, action) => {
  switch (action.type) {
    case CONNECT_SOCKET:
      return {socket: action.socket};
    case DISCONNECT_SOCKET:
      return {socket: null}
    default:
      return state;
  }
}
