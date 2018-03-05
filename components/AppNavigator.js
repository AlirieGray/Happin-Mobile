import React from 'react';
import { StackNavigator, TabNavigator } from "react-navigation";
import Home from '../components/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';
import EventPage from '../components/EventPage';
import EventsList from '../components/EventsList';
import Profile from '../components/Profile';
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
  },
  Main:{
    screen: TabNavigator({
      EventsList: {
        screen: EventsList
      },
      Profile: {
        screen: Profile
      }
    })
  }

}, { headerMode: 'screen'})
