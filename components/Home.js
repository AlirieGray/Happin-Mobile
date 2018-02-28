import React, { Component } from 'react';
import { connect } from 'react-redux';
import Onboard from './Onboard';
import EventsList from './EventsList';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

class Home extends Component {
  constructor(props) {
    super(props);
    /*



    */
  }

  render() {
    return (
      <View>
        {!this.props.isAuthenticated && <Onboard /> }
        {this.props.isAuthenticated && <EventsList /> }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Home);
