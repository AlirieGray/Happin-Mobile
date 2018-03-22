import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as Actions from '../actions/auth';

class Onboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={ require('../logo.png')} style={{width: 300, height: 300}}/>
        </View>
        <View style={styles.buttonStyle}>
          <Button
            title="Log In"
            color="#F44336"
            onPress={() => {
              this.props.navToLogin();
            }}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button
            title="Sign Up"
            color="#F44336"
            onPress={() => {
              this.props.navToSignup();
            }}
          />
        </View>
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
    paddingBottom: 50,
    backgroundColor: '#F5F5F5'
  },
  buttonStyle: {
    margin: 10
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 60
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
