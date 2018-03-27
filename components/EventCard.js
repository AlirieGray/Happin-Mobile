import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


class EventCard  extends Component{

  constructor(props) {
    super(props);
    this.getTags = this.getTags.bind(this);
    this.parseDate = this.parseDate.bind(this);
  }

  getTags() {
    if (this.props.tags) {
      return this.props.tags.split(',').map((tag, index) => {
        return <Text key={this.props._id + index} style={styles.tag}> {tag} </Text>
      })
    }
  }

  // returns a formatted date string
  parseDate(dateString) {
    if (dateString) {
      var dateSections = dateString.split('/');
      var jsDate = new Date(dateSections[2], dateSections[0] - 1, dateSections[1]);
      return weekdays[jsDate.getDay()] + ',' + months[jsDate.getMonth()] + ' ' + jsDate.getDate() + ',' + jsDate.getFullYear();
    }
  }

  render() {
    const { name, description, organizer, address, attendeeCount, distance } = this.props;
    const date = this.parseDate(this.props.date);
    const id = this.props._id;
    const lat = parseFloat(this.props.lat);
    const lng = parseFloat(this.props.lng);
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.eventContainer}>
        <TouchableOpacity onPress={() => {
          navigate("EventPage", {id, lat, lng, name} )
        }} >
          <View>
            <Text style={{fontSize: 22, fontWeight:'bold'}}> {name} </Text>
            <View style={styles.eventDetails}>
              <Text style={styles.detailsText}> {date ? date.split(',')[0] + ', ' + date.split(',')[1] : null} </Text>
              <Text style={styles.detailsText}> {address.split(',')[0]} </Text>
              <Text style={styles.detailsText}> {distance} miles away </Text>
            </View>
            <Text style={styles.detailsText}> {attendeeCount} Attending </Text>
            <View style={styles.divider} />
            <View style={styles.tagsContainer}>
              {this.getTags()}
            </View>

          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  eventContainer: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 4,
    borderColor: '#ddd',
    borderWidth: .5,
    margin: 5
  },
  eventDetails: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 2,
    marginTop: 2
  },
  description: {
    marginBottom: 5,
    paddingLeft: 10
  },
  divider: {
    backgroundColor: '#ccc',
    height: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 3
  },
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 4,
    zIndex: 0,
    maxWidth: '95%',
    flexWrap: 'wrap'
  },
  tag: {
    fontSize: 12,
    color: '#999',
    backgroundColor: '#eee',
    margin: 2,
    borderRadius: 4,
    overflow: 'hidden',
    padding: 3,
    paddingLeft: 5,
    paddingRight: 5
  },
  detailsText: {
    fontSize: 14,
    color: '#333',
    paddingLeft: 5
  }

});

export default EventCard;
