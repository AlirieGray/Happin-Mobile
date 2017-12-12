import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/events';
import EventCard from './EventCard';
import CreateEventForm from './CreateEventForm';

class EventsList extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
      title:  'All Events',
      headerRight: <TouchableHighlight
            onPress={() => {
              this.props.navigation('CreateEventForm');
            }} >
          <Icon name='add-circle-outline' size={30} />
        </TouchableHighlight>
    });

  componentWillMount() {
    this.props.getEvents();
  }

  render() {
    return(
      <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {this.props.events.map(({name, date, address, _id, placeId, description}, index) => {
          return <EventCard key={index} name={name} date={date} id={_id} address={address} placeId={placeId} description={description} {...this.props}/>
        })}
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    margin: 20,
    paddingBottom: 25,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff'
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
