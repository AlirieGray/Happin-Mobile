import React, { Component } from 'react';
import { connect } from 'react-redux';
import Onboard from './Onboard';
import EventsList from './EventsList';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text> Login </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
