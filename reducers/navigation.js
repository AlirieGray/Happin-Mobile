import { NavigationActions } from 'react-navigation'
import {AppNavigator} from '../components/AppNavigator'; // Object has access to router

const INITIAL_STATE = AppNavigator.router.getStateForAction(NavigationActions.init());

export default (state=INITIAL_STATE, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
}
