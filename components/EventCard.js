import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class EventCard  extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    const id = this.props.id;
    const {navigate} = this.props.navigation;
    return(
      <View style={styles.eventContainer}>
        <View style={styles.eventHeader}>
          <Text> {this.props.name} </Text>
          <Text> {this.props.date} </Text>
        </View>
        <Text> {this.props.address} </Text>
        <Button
          title="View Event"
          onPress={() => {
            navigate("EventPage", {navigate, id} )
          }}
        />
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1.7,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  eventHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default EventCard;
