import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { FormLabel, FormInput, Input, FormValidationMessage, SearchBar } from 'react-native-elements';
import Toast, {DURATION} from 'react-native-easy-toast';
import { RaisedTextButton } from 'react-native-material-buttons';
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
        <View style={{display: 'flex', alignItems: 'center'}}>
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
          <Toast ref="loginError" position={'bottom'}/>
          <RaisedTextButton
            title={"Log In"}
            titleColor={"rgb(255,255,255)"}
            color="#4AB169"
            onPress={() => {
              if (this.state.username && this.state.password) {
                this.props.loginUser(this.state);
              } else {
                this.refs.loginError.show('Missing a required field', 500)
              }
            }}
          />
        </View>
        <View>
          <TouchableOpacity onPress={this.props.navToSignup}>
            <Text> Don't have an account? Sign Up </Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fbfffc',
    paddingBottom: 50,
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
