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
    console.log(this.props.tags)
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
              <Text style={styles.date}> {date.split(',')[0] + ', ' + date.split(',')[1]} </Text>
            </View>
            <View style={styles.tagsContainer}>
              {this.getTags()}
            </View>
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
    fontSize: 10,
    color: '#888'
  },
  divider: {
    backgroundColor: '#aaa',
    height: 1
  },
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  tag: {
    fontSize: 12,
    color: '#888'
  }

});

export default EventCard;
