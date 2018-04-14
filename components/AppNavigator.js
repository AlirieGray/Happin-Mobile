import React from 'react';
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { TouchableHighlight } from 'react-native';
import Login from '../components/Login';
import Signup from '../components/Signup';
import EventPage from '../components/EventPage';
import EventsList from '../components/EventsList';
import Settings from '../components/Settings';
import Profile from '../components/Profile';
import CreateEventForm from '../components/CreateEventForm';

const LoginStack = StackNavigator({
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  }
}, {
  headerMode: 'screen',
  initialRouteName: 'Login',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#4AB169',
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
  CreateEventForm: {
    screen: CreateEventForm
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
  EventPage: {
    screen: EventPage
  }
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
  },
  Settings: {
    screen: Settings
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
