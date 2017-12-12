import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';


class EventCard  extends Component{
  constructor(props) {
    super(props);
  }
  render(){
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
              <Text style={styles.address}> {this.props.address} </Text>
              <Text> {this.props.date} </Text>
            </View>
            <Text style={styles.description}> {this.props.description} </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  eventContainer: {
    margin: 13,
    padding: 14,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1.7,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  eventDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10,
    marginTop: 2
  },
  description: {
    marginTop: 5,
    marginBottom: 5
  },
  address: {
  }
});

export default EventCard;
