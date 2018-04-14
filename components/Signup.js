import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, SearchBar } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { RaisedTextButton } from 'react-native-material-buttons';
import Toast, {DURATION} from 'react-native-easy-toast';
import * as Actions from '../actions/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Left = ({ onPress }) => (
  <TouchableOpacity style={{ padding: 10 }} onPress={() => {
    onPress()
  }}>
    <Icon name="arrow-back" size={30} color={'#FFF'}/>
  </TouchableOpacity>
);

class Signup extends Component {
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
    },
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 20,
      textAlign: 'center',
      width: '80%',
    },
    headerLeft: <Left onPress={navigation.goBack} />
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
        <Image source={require('../images/light.png')} style={{marginBottom: 20}}/>
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
        <Toast
          ref="toast"
          style={{backgroundColor:'#777', borderRadius: 20}}
          position='bottom'
          positionValue={250}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={1}
          textStyle={{color:'white'}}
        />
        <RaisedTextButton
          title={"Sign Up"}
          titleColor={"rgb(255,255,255)"}
          color="#4AB169"
          onPress={() => {
            if (this.state.username && this.state.password) {
              this.props.loginUser(this.state);
            } else {
              this.refs.toast.show('Missing a required field', 500)
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
    backgroundColor: '#fbfffc',
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
