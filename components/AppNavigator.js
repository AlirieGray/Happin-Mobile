import React from 'react';
import { StackNavigator } from "react-navigation";
import EventsList from '../components/EventsList';
import EventPage from '../components/EventPage';
import CreateEventForm from '../components/CreateEventForm';

export const AppNavigator = StackNavigator({
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
