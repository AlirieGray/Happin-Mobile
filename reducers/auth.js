
// The auth reducer
// The starting state sets authentication based on a token
// in local storage.
// TODO: check if token is expired

const authDefaultState = {
  isFetching: false,
  isAuthenticated: false
  // TODO: AsyncStorage
  // isAuthenticated: localStorage.getItem('id_token') ? true : false
}

export default (state = authDefaultState, action) => {
  switch(action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: ''
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        userId: action.userId,
        errorMessage: ''
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.message
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: ''
      }
    case 'SIGNUP_REQUEST':
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: ''
      }
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        userId: action.userId,
        errorMessage: ''
      }
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.message
      }
    default:
      return state
  }
}
