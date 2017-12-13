import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';


class EventCard  extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    const id = this.props.id;
    const lat = parseFloat(this.props.lat);
    const lng = parseFloat(this.props.lng);
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.eventContainer}>
        <TouchableHighlight onPress={() => {
          navigate("EventPage", {navigate, id, lat, lng} )
        }} >
          <View>
            <Text style={{fontSize: 20, fontWeight:'bold'}}> {this.props.name} </Text>
            <View style={styles.eventDetails}>
              <Text style={styles.address}> {this.props.address.split(',')[0]} </Text>
              <Text> {this.props.date} </Text>
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
