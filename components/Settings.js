import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { TextButton } from 'react-native-material-buttons';
import * as Actions from '../actions/auth';

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => ({
    title: "Settings",
    headerTitleStyle: {
      color: '#FFF',
      textAlign: 'center',
      width: '90%',
      fontSize: 20
    },
    headerStyle: {
      backgroundColor: '#4AB169',
      display: 'flex',
      justifyContent: 'space-between',
      shadowOpacity: 0,
      shadowRadius: 0,
      borderBottomWidth: 0,
      elevation: 0,
      shadowOffset: {
        height: 0,
        width: 0
      }
    },
    headerLeft: (<TouchableOpacity
      style={styles.navHeaderButton}
      onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name='menu' size={32} color={'#FFF'}/>
       </TouchableOpacity>)
  });

  render() {
    return (
      <View style={styles.container}>
        <TextButton
        title={"Log Out"} onPress={() => {
          this.props.logoutUser();
        }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4AB169",
    display: 'flex',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fbfffc',
    paddingBottom: 50,
    flex: 1,
    paddingTop: 30,
    paddingLeft: 20
  },
  navHeaderButton: {
    padding: 22
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
