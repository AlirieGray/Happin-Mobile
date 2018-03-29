import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EventsList from './components/EventsList';
import EventPage from './components/EventPage';
import CreateEventForm from './components/CreateEventForm';
import { Provider, connect } from 'react-redux';
import ConfigureStore from './store/ConfigureStore';
import { ActionCreators } from './actions';
import { bindActionCreators } from 'redux';
import { StackNavigator, NavigationActions, DrawerNavigator, addNavigationHelpers } from "react-navigation";
import {AppNavigator} from './components/AppNavigator';
import serverPath from './paths';
import io from 'socket.io-client';
import { addHapSocket } from './reducers/events';

// loading={<ActivityIndicator size="small" color="#0000ff"/>}

const store = ConfigureStore();

class App extends Component {

  constructor(props) {
    super(props);
    this.socket = io(`${serverPath}`);
    this.socket.on('New Hap', (res) => {
      console.log(res);
      // dispatch to store
      this.props.addHapSocket(res.hap)
    })
  }

  componentWillUnount() {
    this.socket.disconnect();
  }

  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.navigation,
        })} />
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation, // needed for addNavigationHelpers,
  events: state.events
});

const bindAction = dispatch => {
    return Object.assign({dispatch: dispatch, addHapSocket}, bindActionCreators(ActionCreators, dispatch));
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
