import { SET_LOCATION } from '../actions/location';

const locationDefaults = {
  latitude: 0,
  longitude: 0
}

export default (state = locationDefaults, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude
      }
    default:
      return state;
  }
}
