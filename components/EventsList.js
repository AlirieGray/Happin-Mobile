import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/events';
import EventCard from './EventCard';
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
    title: 'Events'
  });

  render() {
    return(
      <View style={styles.container}>
      <TouchableHighlight
            style={styles.addNewEventButton}
            onPress={() => {
            this.props.navigation.navigate('CreateEventForm');
            }} >
          <Icon name='add-circle-outline' size={30} />
        </TouchableHighlight>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {this.props.events.map(({name, date, address, _id, placeId, description, lat, lng}, index) => {
          return <EventCard key={index} name={name} date={date} id={_id} address={address} placeId={placeId} lat={lat} lng={lng} description={description} {...this.props}/>
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  empty: {
    padding: 30,
  },
  addNewEventButton: {
    display: 'flex',
    alignItems: 'flex-end',
    marginRight: 10,
    marginTop: 5
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
