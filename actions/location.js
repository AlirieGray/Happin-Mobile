export const SET_LOCATION = 'SET_LOCATION';

export const setLocation = (position) =>({
  type: SET_LOCATION,
  latitude: position.latitude,
  longitude: position.longitude
})
