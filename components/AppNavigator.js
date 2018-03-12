import React from 'react';
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { TouchableHighlight } from 'react-native';
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
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#F44336',
      paddingTop: 30,
      paddingBottom: 15,
      height: 80
    }
  }
})

const ProfileStack = StackNavigator({
  Profile: {
    screen: Profile
  },
  EventPage: {
    screen: EventPage
  }
}, {
  initialRouteName: 'Profile',
  headerMode: 'none',
})

const EventsStack = StackNavigator({
  CreateEventForm: {
    screen: CreateEventForm
  },
  EventsList: {
    screen: EventsList
  },
}, {
  initialRouteName: 'EventsList',
  headerMode: 'none'
})

const DrawerStack = DrawerNavigator({
  EventsStack: {
    screen: EventsStack
  },
  ProfileStack: {
    screen: ProfileStack
  }
}, {
  initialRouteName: 'EventsStack',
  headerMode: 'none'
})

const DrawerNavigation = StackNavigator({
  DrawerStack: {
    screen: DrawerStack
  }
})

export const AppNavigator = StackNavigator({
  loginStack: {
    screen: LoginStack
  },
  drawerStack: {
    screen: DrawerNavigation
  }
}, {
  headerMode: 'none',
  initialRouteName: 'loginStack'
})
