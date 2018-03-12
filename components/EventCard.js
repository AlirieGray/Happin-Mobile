import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


class EventCard  extends Component{
  constructor(props) {
    super(props);
    this.parseDate = this.parseDate.bind(this);
  }

  // returns a formatted date string
  parseDate(dateString) {
    var dateSections = dateString.split('-');
    var jsDate = new Date(dateSections[0], dateSections[1] - 1, dateSections[2]);
    return weekdays[jsDate.getDay()] + ', ' + months[jsDate.getMonth()] + ' ' + jsDate.getDate()
  }

  render() {
    const id = this.props.id;
    const lat = parseFloat(this.props.lat);
    const lng = parseFloat(this.props.lng);
    const { navigate } = this.props.navigation;
    const organizer = this.props.organizer;

    return (
      <View style={styles.eventContainer}>
        <TouchableHighlight onPress={() => {
          navigate("EventPage", {navigate, id, lat, lng, organizer} )
        }} >
          <View>
            <Text style={{fontSize: 20, fontWeight:'bold'}}> {this.props.name} </Text>
            <View style={styles.eventDetails}>
              <Text style={styles.address}> {this.props.address.split(',')[0]} </Text>
              <Text> {this.parseDate(this.props.date)} </Text>
            </View>
            <Text numberOfLines={2} renderTruncatedFooter={"..."} style={styles.description}> {this.props.description} </Text>
            <View style={styles.divider} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  eventContainer: {
    padding: 5,
    marginBottom: 5,
  },
  divider: {
    backgroundColor: 'gray',
    height: 1
  },
  eventDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 2,
    width: 300,
  },
  description: {
    marginTop: 5,
    marginBottom: 5,
  },
  address: {
  }
});

export default EventCard;
