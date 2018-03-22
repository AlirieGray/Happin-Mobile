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
    const { name, description, organizer, date, address } = this.props;
    const id = this.props._id;
    const lat = parseFloat(this.props.lat);
    const lng = parseFloat(this.props.lng);
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.eventContainer}>
        <TouchableHighlight onPress={() => {
          navigate("EventPage", {navigate, id, lat, lng, organizer} )
        }} >
          <View>
            <Text style={{fontSize: 20, fontWeight:'bold'}}> {name} </Text>
            <View style={styles.eventDetails}>
              <Text style={styles.address}> {address.split(',')[0]} </Text>
              <Text style={styles.date}> {this.parseDate(date)} </Text>
            </View>
            <Text numberOfLines={2} renderTruncatedFooter={"..."} style={styles.description}> {description} </Text>
            <View style={styles.divider} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  eventContainer: {
    backgroundColor: '#fff',
    borderRadius: 2,
    padding: 5
  },
  eventDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    marginTop: 2,
  },
  description: {
    marginBottom: 5,
    paddingLeft: 10
  },
  address: {
    fontSize: 10,
    paddingLeft: 10
  },
  date: {
    fontSize: 9,
    color: '#888'
  },
  divider: {
    backgroundColor: '#aaa',
    height: 1
  }

});

export default EventCard;
