import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, ScrollView, ActivityIndicator, TouchableHighlight, Image } from 'react-native';
import { FormLabel, FormInput, Input, FormValidationMessage, SearchBar } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: '#4AB169',
      paddingTop: 30,
      paddingBottom: 15,
      height: 80
    }
  });

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
        <Image source={require('../images/light.png')} />
        <FormInput
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          placeholder={'Username'}
          onChangeText={this.updateUsername}
          underlineColorAndroid={'#4AB169'}
        />
        <FormInput inputStyle={styles.input}
          containerStyle={styles.inputContainer}
          placeholder={'Password'}
          onChangeText={this.updatePassword}
          secureTextEntry={true}
          underlineColorAndroid={'#4AB169'}
        />
        <Button
          title="Log In"
          color="#4AB169"
          onPress={() => {
            if (this.state.username && this.state.password) {
              this.props.loginUser(this.state);
            } else {
              console.log('missing a required field')
            }
          }}
        />
        <View>
          <Text> Don't have an account? </Text>
          <Button
            title="Sign Up"
            color="#4AB169"
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
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fbfffc'
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
