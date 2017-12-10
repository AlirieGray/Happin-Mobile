import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EventCard = ({name, date, address, id, placeId}) => (
  <View style={styles.eventContainer}>
    <View style={styles.eventHeader}>
      <Text> {name} </Text>
      <Text> {date} </Text>
    </View>
    <Text> {address} </Text>
  </View>
);

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
    shadowRadius: 2,
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
