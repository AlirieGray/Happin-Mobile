import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Actions from '../actions/events';
import EventCard from './EventCard';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getUserEvents(this.props.auth.userId);
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'My Events',
    headerStyle: {
      backgroundColor: '#F44336',
      paddingTop: 30,
      paddingBottom: 15,
      height: 70
    },
    headerLeft: (<TouchableHighlight
      style={styles.navHeaderButton}
      onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name='menu' size={30} />
       </TouchableHighlight>),
    headerRight: <TouchableHighlight
      style={styles.navHeaderButton}
      onPress={() => {
        navigation.navigate('CreateEventForm');
        }} >
      <Icon name='add' size={30} />
    </TouchableHighlight>
  });

  render() {
    console.log("user events:" + this.props.userEvents.toString())
    return(
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {this.props.userEvents.slice(0).reverse().map(({name, date, address, _id, placeId, description, lat, lng, organizer}, index) => {
            return <EventCard
              key={index}
              name={name}
              date={date}
              id={_id}
              address={address}
              placeId={placeId}
              lat={lat}
              lng={lng}
              description={description}
              organizer={organizer}
              {...this.props}  />
          })}
          <View style={styles.empty} />
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  contentContainer: {
    margin: 20,
    paddingBottom: 25
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F5F5F5'
  },
  empty: {
    padding: 30
  },
  addNewEventButton: {
    marginRight: 6
  }
});

const mapStateToProps = (state) => {
  return {
    userEvents: state.userEvents,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
