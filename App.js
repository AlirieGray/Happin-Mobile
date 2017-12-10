import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EventsList from './components/EventsList';
import { Provider } from 'react-redux';
import ConfigureStore from './store/ConfigureStore';

const store = ConfigureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <EventsList />
      </Provider>
    );
  }
}
