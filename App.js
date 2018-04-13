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
import { addHap } from './actions/events';
import {connectSocket, disconnectSocket} from './actions/socket';

// loading={<ActivityIndicator size="small" color="#0000ff"/>}

const store = ConfigureStore();

class App extends Component {

  constructor(props) {
    super(props);
    console.ignoredYellowBox = ['Setting a timer'];
    this.socket = io(`${serverPath}`);
    this.props.connectSocket(this.socket);

    this.socket.on('New Hap', (res) => {
      console.log(res);
      // dispatch to store
      this.props.addHap(res.hap)
    })
    this.socket.on('Error', (res) => {
      console.log(res);
    })
  }

  componentWillUnount() {
    console.log("App unmounting")
    this.socket.disconnect();
    this.props.disconnectSocket();
  }

  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.navigation
        })} />
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.navigation, // needed for addNavigationHelpers
  events: state.events,
  socket: state.socket
});

const mapDispatchToProps = dispatch => {
  // add dispatch itself to props, so it is available for addNavigationHelpers
  return Object.assign({dispatch: dispatch}, bindActionCreators({addHap, connectSocket, disconnectSocket}, dispatch))
};

const AppWithNavigationState = connect(mapStateToProps, mapDispatchToProps)(App)


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
