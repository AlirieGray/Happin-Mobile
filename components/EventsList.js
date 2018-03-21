import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../actions/events';
import * as modalActions from '../actions/modal';
import * as filterActions from '../actions/filters';
import EventCard from './EventCard';
import Searchbar from './Searchbar';
import CreateEventForm from './CreateEventForm';
import SortButtons from './SortButtons';
import { NavigationActions } from 'react-navigation';


class EventsList extends Component {

  componentWillMount() {
    this.props.getEvents();
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Find Events',
    headerStyle: {
      backgroundColor: '#F44336',
      paddingTop: 30,
      shadowOpacity: 0,
      shadowRadius: 0,
      borderBottomWidth: 0,
      elevation: 0,
      shadowOffset: {
        height: 0,
        width: 0
      }
    },
    headerLeft: (<TouchableHighlight
      style={styles.navHeaderButton}
      onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name='menu' size={30} />
       </TouchableHighlight>),
    headerRight: <TouchableHighlight
      style={styles.navHeaderButton}
      onPress={() => {
        dispatch(setCreateEventModal(true))
      }} >
      <Icon name='add' size={30} />
    </TouchableHighlight>
  });

  render() {
    const events = this.props.events;
    return (
      <View style={styles.container}>
        <CreateEventForm />
        <View style={styles.header}>
          <Searchbar />
          <SortButtons />
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {events.map((event, index) => {
            return <EventCard key={event._id} {...event} {...this.props}  />
          })}
          <View style={styles.empty} />
        </ScrollView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  contentContainer: {
    margin: 20,
    paddingBottom: 25
  },
  header: {
    backgroundColor: "#F44336",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F5F5F5'
  },
  empty: {
    padding: 30
  },
  navHeaderButton: {
    margin: 6
  }
});

const mapStateToProps = (state) => {
  return {
    events: state.events,
    filters: state.filters,
    modal: state.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  const actions = Object.assign({}, eventActions, modalActions, filterActions);
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
