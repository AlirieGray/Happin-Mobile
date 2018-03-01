import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Actions from '../actions/auth';

class Onboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(      
      <View style={styles.container}>
        <Button
          title="Login"
          onPress={() => {
            this.props.navToLogin();
          }}
        />
        <Button
          title="Sign Up"
          onPress={() => {
            this.props.navToSignup();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 35,
    backgroundColor: '#F5F5F5'
  }
})

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Onboard);
