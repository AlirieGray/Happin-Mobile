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
  },
  eventHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default EventCard;
