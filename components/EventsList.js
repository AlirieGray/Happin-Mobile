import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/events';
import EventCard from './EventCard';
import Searchbar from './Searchbar';
import CreateEventForm from './CreateEventForm';
import { NavigationActions } from 'react-navigation';

class EventsList extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getEvents();
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Find Events',
    headerStyle: {
      backgroundColor: '#F44336',
      shadowOpacity: 0,
      shadowRadius: 0,
      borderBottomWidth: 0,
      elevation: 0,
      shadowOffset: {
        height: 0,
        width: 0
      }
    },
    headerRight: <TouchableHighlight
      style={styles.addNewEventButton}
      onPress={() => {
        navigation.navigate('CreateEventForm');
        }} >
      <Icon name='add' size={30} />
    </TouchableHighlight>
  });

  render() {
    console.log(this.props.events)
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Searchbar />
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {this.props.events.slice(0).reverse().map(({name, date, address, _id, placeId, description, lat, lng, organizer}, index) => {
            return <EventCard
              key={index}
              name={name}
              date={date}
              id={_id}
              address={address}
              placeId={placeId}
              lat={lat}
              lng={lng}
              description={description}
              organizer={organizer}
              {...this.props}  />
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
  addNewEventButton: {
    marginRight: 6
  }
});

const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
