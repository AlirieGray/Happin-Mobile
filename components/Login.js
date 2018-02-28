import React, { Component } from 'react';
import { connect } from 'react-redux';
import Onboard from './Onboard';
import EventsList from './EventsList';
import { StyleSheet, Text, View, Button, ScrollView, ActivityIndicator } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, SearchBar } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  updateUsername(txt) {
    this.setState({ username: txt });
  }

  updatePassword(txt) {
    this.setState({ password: txt });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loading}>
          {this.props.auth.isFetching && <ActivityIndicator size="small" color="#0000ff"/> }
        </View>
        <Text> {this.props.auth.errorMessage } </Text>
        <FormLabel> Name </FormLabel>
        <FormInput
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          onChangeText={this.updateUsername}
        />
        <FormLabel> Password </FormLabel>
        <FormInput inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          onChangeText={this.updatePassword}
          secureTextEntry={true}
        />
        <Button
          title="Submit"
          onPress={() => {
            if (this.state.username && this.state.password) {
              this.props.loginUser(this.state);
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5'
  },
  input: {
    paddingLeft: 10,
    width: 295
  },
  inputContainer: {
    marginBottom: 15,
    width: 300
  },
  descriptionContainer: {
    marginBottom: 35,
    width: 300
  },
  loading: {
    height: 50,
    paddingTop: 10
  }
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);