import React from 'react';
import { StackNavigator, DrawerNavigator } from "react-navigation";
import Home from '../components/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';
import EventPage from '../components/EventPage';
import EventsList from '../components/EventsList';
import Profile from '../components/Profile';
import CreateEventForm from '../components/CreateEventForm';

const LoginStack = StackNavigator({
  Home: {
    screen: Home
  },
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  }
}, {
  headerMode: 'screen',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#F44336',
      paddingTop: 30,
      paddingBottom: 15,
      height: 80
    }
  }
})

const DrawerStack = DrawerNavigator({
  EventPage: {
    screen: EventPage
  },
  CreateEventForm: {
    screen: CreateEventForm
  },
  EventsList: {
    screen: EventsList
  },
  Profile: {
    screen: Profile
  }
})

const DrawerNavigation = StackNavigator({
  DrawerStack: {
    screen: DrawerStack
  }
})

export const AppNavigator = StackNavigator({
  loginStack : {
    screen: LoginStack
  },
  drawerStack: {
    screen: DrawerNavigation
  }
}, {
  headerMode: 'none',
  initialRouteName: 'loginStack'
})
