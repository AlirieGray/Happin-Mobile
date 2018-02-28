import serverPath from '../paths';
import { NavigationActions } from 'react-navigation'

export const requestSignUp = (creds) => ({
  type: 'REQUEST_SIGNUP',
  isFetching: true,
  isAuthenticated: false,
  creds
})

export const receiveSignUp = (user) => ({
  type: 'SIGNUP_SUCCESS',
  isAuthenticated: true,
  isFetching: false,
  id_token: user.id_token,
  access_token: user.access_token
})

export const signUpError = (message) => ({
  type: 'SIGNUP_FAILURE',
  isFetching: false,
  isAuthenticated: false,
  message
})

export const requestLogin = (creds) => ({
  type: 'LOGIN_REQUEST',
  isFetching: true,
  isAuthenticated: false,
  creds
})

export const receiveLogin = (user) => ({
  type: 'LOGIN_SUCCESS',
  isFetching: false,
  isAuthenticated: true,
  id_token: user.id_token,
  access_token: user.access_token
})

export const loginError = (message) => ({
  type: 'LOGIN_FAILURE',
  isFetching: false,
  isAuthenticated: false,
  message
})

export const requestLogout = () => ({
  type: 'LOGOUT_REQUEST',
  isFetching: false,
  isAuthenticated: false
})

export function loginUser(creds) {
  console.log("requesting login...")
  let config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }

  return dispatch => {
    dispatch(requestLogin(creds));
    console.log('sent request login dispatch')

    return fetch(`${serverPath}/login`, config).then((res) => {
      console.log(res)
      if (res.status != 200) {
        dispatch(loginError(res.statusText));
        return Promise.reject("Could not login");
      }
      return res.json();
    }).then(async (json) => {
        console.log(json);
        console.log("logged in!")
        try {
          await AsyncStorage.setItem('token', json.token);
        } catch (error) {
          throw error;
        }

        dispatch(receiveLogin({
          id_token: json.id_token,
          access_token: json.access_token }));
    }).catch((err) => {
      dispatch(loginError(err));
    });
  }
}

export function logoutUser () {
    return dispatch => {
      dispatch(requestLogout());
      try {
        //await AsyncStorage.removeItem('userId');
        //await AsyncStorage.removeItem('access_token');

      } catch(error) {
        throw error;
      }
    }
}

export function navToLogin() {
  console.log("calling nav")
  return (dispatch, getState) => {
      dispatch(NavigationActions.navigate({ routeName: 'Login' }));
  }
}

export function navToSignup() {
  console.log("calling nav")
  return (dispatch, getState) => {
      dispatch(NavigationActions.navigate({ routeName: 'Signup' }));
  }
}
