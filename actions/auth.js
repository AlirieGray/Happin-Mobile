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
  token: userDetails.token,
  username: userDetails.username
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
  token: userDetails.token,
  username: userDetails.username
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
    }).then( async (json) => {
      dispatch(receiveSignUp({userId: json.userId, token: json.token, username: creds.username}));
      try {
        console.log("saving token!")
        await AsyncStorage.setItem('token', json.token);
      } catch (error) {
        console.log(error);
      }

      dispatch(NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'drawerStack', screenName: 'EventsList' })
        ]
      }))
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
    return fetch(`${serverPath}/login`, config).then((res) => {
      if (res.status !== 200) {
        return Promise.reject("Could not login");
      }
      return res.json();
    }).then(async (json) => {
        console.log("logged in!")
        console.log("SENDING USERNAME TO REDUX", creds.username)
        console.log("SENDING ID TO REDUX", json.userId)
        dispatch(receiveLogin({userId: json.userId, token: json.token, username: creds.username}));
        try {
          await AsyncStorage.setItem('token', json.token);
        } catch (error) {
          console.log(error);
        }

        dispatch(NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: 'drawerStack', screenName: 'EventsList' })
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
        //await AsyncStorage.removeItem('token');

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
