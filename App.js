import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EventsList from './components/EventsList';
import EventPage from './components/EventPage';
import CreateEventForm from './components/CreateEventForm';
import { Provider, connect } from 'react-redux';
import ConfigureStore from './store/ConfigureStore';
import { StackNavigator, NavigationActions, addNavigationHelpers } from "react-navigation";

const store = ConfigureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

const mapNavigationStateToProps = (Wrapper) => {
  return class extends Component {
    static navigationOptions = Wrapper.navigationOptions;
    render() {
      const {navigation: {state: {params}}} = this.props;
      return <Wrapper {...this.props} {...params} />
    }
  }
}

const AppNavigator = StackNavigator({
  EventsList: {
    screen: EventsList,
  },
  EventPage: {
    screen: EventPage
  },
  CreateEventForm: {
    screen: CreateEventForm
  }
}, { headerMode: 'screen'})
