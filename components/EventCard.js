import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';


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
    const { name, description, organizer, date, address, attendees } = this.props;
    const id = this.props._id;
    const lat = parseFloat(this.props.lat);
    const lng = parseFloat(this.props.lng);
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.eventContainer}>
        <TouchableHighlight onPress={() => {
          navigate("EventPage", {id, lat, lng, name} )
        }} >
          <View>
            <Text style={{fontSize: 22, fontWeight:'bold'}}> {name} </Text>
            <View style={styles.eventDetails}>
              <Text style={styles.detailsText}> {date.split(',')[0] + ', ' + date.split(',')[1]} </Text>
              <Text style={styles.detailsText}> {address.split(',')[0]} </Text>
              <Text style={styles.detailsText}> .75 miles </Text>
            </View>
            <Text style={styles.detailsText}> {attendees} Attending </Text>
            <View style={styles.divider} />
            <View style={styles.tagsContainer}>
              {this.getTags()}
            </View>

          </View>
        </TouchableHighlight>
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
    fontSize: 14,
    color: '#999',
    backgroundColor: '#eee',
    margin: 2,
    borderRadius: 4,
    overflow: 'hidden'
  },
  detailsText: {
    fontSize: 14,
    color: '#333',
    paddingLeft: 10
  }

});

export default EventCard;
