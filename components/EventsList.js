import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/events';
import EventCard from './EventCard';

class EventsList extends Component {

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
    margin: 20
  },
  nav: {
    padding: 20,
    backgroundColor: 'red'
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
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
