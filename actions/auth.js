import serverPath from '../paths';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation'

export const requestSignUp = (creds) => ({
  type: 'SIGNUP_REQUEST',
  isFetching: true,
  isAuthenticated: false,
  creds
})

export const receiveSignUp = (userDetails) => ({
  type: 'SIGNUP_SUCCESS',
  isAuthenticated: true,
  isFetching: false,
  userId: userDetails.userId,
  token: userDetails.token
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

export const receiveLogin = (userDetails) => ({
  type: 'LOGIN_SUCCESS',
  isFetching: false,
  isAuthenticated: true,
  userId: userDetails.userId,
  token: userDetails.token
})

export const loginError = (message) => ({
  type: 'LOGIN_FAILURE',
  isFetching: false,
  isAuthenticated: false,
  message
})

export const logout = () => ({
  type: 'LOGOUT',
  isFetching: false,
  isAuthenticated: false
})

export function signupUser(creds) {
  let config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }

  return dispatch => {
    dispatch(requestSignUp(creds));
    return fetch(`${serverPath}/signup`, config).then((res) => {
      if (res.status !== 200) {
        return Promise.reject("Could not signup");
      }
      return res.json();
    }).then((json) => {
      console.log(json);
      dispatch(receiveSignUp({userId: json.userId, token: json.token}));
      dispatch(NavigationActions.navigate({ routeName: 'EventsList' }));
    }).catch((err) => {
      console.log(err);
      dispatch(signUpError(err));
    })
  }
}

export function loginUser(creds) {
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
      if (res.status !== 200) {
        return Promise.reject("Could not login");
      }
      return res.json();
    }).then( (json) => {
        console.log("logged in!")
        console.log(json.userId)

        dispatch(receiveLogin({userId: json.userId, token: json.token}));
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'EventsList' })
          ]
        }))
    }).catch((err) => {
      console.log(err)
      dispatch(loginError(err));
    });
  }
}

export function logoutUser () {
    return async dispatch => {
      dispatch(requestLogout());
      try {
        await AsyncStorage.removeItem('userId');
        //await AsyncStorage.removeItem('access_token');

      } catch(error) {
        throw error;
      }
    }
}

export function navToLogin() {
  return (dispatch, getState) => {
      dispatch(NavigationActions.navigate({ routeName: 'Login' }));
  }
}

export function navToSignup() {
  return (dispatch, getState) => {
      dispatch(NavigationActions.navigate({ routeName: 'Signup' }));
  }
}
