import React from 'react';
import { StackNavigator } from "react-navigation";
import Home from '../components/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';
import EventPage from '../components/EventPage';
import CreateEventForm from '../components/CreateEventForm';

export const AppNavigator = StackNavigator({
  Home: {
    screen: Home
  },
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  },
  EventPage: {
    screen: EventPage
  },
  CreateEventForm: {
    screen: CreateEventForm
  }
}, { headerMode: 'screen'})