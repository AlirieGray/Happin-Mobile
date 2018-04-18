import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


class EventCard  extends Component{

  constructor(props) {
    super(props);
    this.getTags = this.getTags.bind(this);
  }

  getTags() {
    if (this.props.tags) {
      return this.props.tags.split(',').map((tag, index) => {
        return <Text key={this.props._id + index} style={styles.tag}> {tag} </Text>
      })
    }
  }

  /*
  <View style={styles.eventContainer}>
    <TouchableOpacity onPress={() => {
      navigate("EventPage", {id, lat, lng, name} )
    }} >
      <View>
        <Text style={{fontSize: 18, fontWeight:'bold'}}> {name} </Text>
        <View style={styles.eventDetails}>
          <Text style={styles.organizer}> {organizer} </Text>
          <Text style={styles.detailsText}> {distance} miles away </Text>
        </View>
        <View style={{display: 'flex', alignItems: 'flex-end'}}>
          <Text style={styles.detailsText}> {dateFormatted} </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.tagsContainer}>
          {this.getTags()}
        </View>
      </View>
    </TouchableOpacity>
  </View>


  ///////
  <Text> {organizer} </Text>
  <Text> {distance + ' miles away            ' + timeUntil}> </Text>
  <View style={styles.divider}> </View>
  <View style={styles.tagsContainer}> {this.getTags()}</View>

  */

  render() {
    const { name, description, organizer, address, attendeeCount, distance, timeUntil } = this.props;
    var dateFormatted = this.props.dateFormatted;
    if (dateFormatted[0] == '0') {
      dateFormatted = dateFormatted.slice(1)
    }
    const id = this.props._id;
    const lat = parseFloat(this.props.lat);
    const lng = parseFloat(this.props.lng);
    const { navigate } = this.props.navigation;

    return (
      <TouchableOpacity onPress={() => {
        navigate("EventPage", {id, lat, lng, name} )
      }} >
        <View style={styles.card}>
          <Text style={styles.title}> {name} </Text>
          <Text style={styles.organizer}> {organizer} </Text>
          <View style={{paddingLeft: 4, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
            <Text style={styles.contentText}> {distance} miles away </Text>
            <Text style={styles.contentText}> {timeUntil} </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.tagsContainer}>
            {this.getTags()}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    margin: 4,
    elevation: 1
  },
  title: {
    fontSize: 24,
    color: '#000',
  },
  contentText: {
    color: '#999',
    fontSize: 14,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%'
  },
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 4,
    paddingBottom: 4,
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
  organizer: {
    fontSize: 16,
    color: '#4AB169',
    paddingLeft: 4
  }

});

export default EventCard;
