import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as eventActions from '../actions/events';
import * as modalActions from '../actions/modal';
import EventCard from './EventCard';


class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showHosting: true
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.props.getUserEvents(this.props.auth.userId);
    this.props.navigation.setParams({ setCreateEventModal: this.props.setCreateEventModal });
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'My Events',
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
      paddingTop: 30,
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
        <Icon name='menu' size={30} color={'#FFF'}/>
       </TouchableOpacity>),
    headerRight: <TouchableOpacity
      style={styles.navHeaderButton}
      onPress={() => {
        navigation.state.params.setCreateEventModal(true)
        }} >
      <Icon name='add' size={30} color={'#FFF'} />
    </TouchableOpacity>
  });

  render() {
    const created = this.props.userEvents.created;
    const attending = this.props.userEvents.attending;
    var haps = null;
    if (this.state.isHosting) {
      {haps = created.map((event, index) => {
        return <EventCard key={event._id} {...event} {...this.props}  />
      })}
    } else {
      {haps = attending.map((event, index) => {
        return <EventCard key={event._id} {...event} {...this.props}  />
      })}
    }
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => {
              this.setState({isHosting: true})
            }}>
            <Text style={{color:this.state.isHosting ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,.65)'}}> Hosting </Text>
          </TouchableOpacity>
          <View  style={styles.divider}/>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => {
              this.setState({isHosting: false})
            }}>
            <Text style={{color:!this.state.isHosting ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,.65)'}}> Attending </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {haps}
            <View style={styles.empty} />
          </ScrollView>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  contentContainer: {
    minHeight: '100%'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFF'
  },
  header: {
    backgroundColor: "#4AB169",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 5
  },
  empty: { // TODO: fix padding method to match EventsList
    padding: 30
  },
  addNewEventButton: {
    marginRight: 6
  },
  navHeaderButton: {
    padding: 20
  },
  tab: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 24,
    width: 1,
    backgroundColor: '#FFF'
  }
});

const mapStateToProps = (state) => {
  return {
    userEvents: state.userEvents,
    auth: state.auth,
    modal: state.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, eventActions, modalActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
