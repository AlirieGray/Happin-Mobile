import {AppNavigator} from '../components/AppNavigator'; // Object has access to router

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('EventsList'));

export default (state=initialState ,action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
}
