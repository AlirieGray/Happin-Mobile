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

  render() {
    const { name, description, organizer, address, attendeeCount, distance } = this.props;
    var dateFormatted = this.props.dateFormatted;
    if (dateFormatted[0] == '0') {
      dateFormatted = dateFormatted.slice(1)
    }
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
    justifyContent: 'space-between',
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
  },
  organizer: {
    fontSize: 14,
    color: '#4AB169',
    paddingLeft: 2
  }

});

export default EventCard;
