import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EventsList from './components/EventsList';
import EventPage from './components/EventPage';
import CreateEventForm from './components/CreateEventForm';
import { Provider, connect } from 'react-redux';
import ConfigureStore from './store/ConfigureStore';
import { ActionCreators } from './actions';
import { bindActionCreators } from 'redux';
import { StackNavigator, NavigationActions, addNavigationHelpers } from "react-navigation";
import {AppNavigator} from './components/AppNavigator';

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
        <AppNavigator
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.navigation,
          })}
         />
    );
  }
}

// const mapNavigationStateToProps = (Wrapper) => {
//   return class extends Component {
//     static navigationOptions = Wrapper.navigationOptions;
//     render() {
//       const {navigation: {state: {params}}} = this.props;
//       return <Wrapper {...this.props} {...params} />
//     }
//   }
// }

const mapStateToProps = state => ({
  navigation: state.navigation, // needed for addNavigationHelpers
});

const bindAction = dispatch => {
    return Object.assign({dispatch: dispatch}, bindActionCreators(ActionCreators, dispatch));
    // add dispatch itself to props, so available for addNavigationHelpers
};

const AppWithNavigationState = connect(mapStateToProps, bindAction)(App)


class Root extends Component {
  render() {
    return(
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default Root;
