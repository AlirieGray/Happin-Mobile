import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import * as Actions from '../actions/events';
import Map from './Map';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextButton } from 'react-native-material-buttons';
import { Button } from 'react-native-elements';

// details for Google Maps View
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LAT_DELTA = 0.008;
const LNG_DELTA = LAT_DELTA / ASPECT_RATIO;

const Left = ({ onPress }) => (
  <TouchableHighlight onPress={() => {
    onPress()
  }}>
    <Icon name="arrow-back" size={30} />
  </TouchableHighlight>
);

class EventPage extends Component {
  constructor(props){
    super(props);

    this.state  = {
      markers: [],
      attending: false,
      seeFullDescription: false
    }
  }

  componentWillMount() {
    this.props.getEventById(this.props.navigation.state.params.id);
    //this.props.navigation.setParams({ eventName: this.props.name });
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    headerStyle: {
      backgroundColor: '#F44336',
      paddingTop: 30,
      paddingBottom: 15,
      height: 80,
    },
    headerTitleStyle: {
      fontSize: 20
    },
    headerLeft: <Left onPress={navigation.goBack} />
  });

  render() {
    const { name, address, date, description, organizer } = this.props.currentEvent;
    return(
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.details}>
            <Text style={styles.detailsText}> {address} </Text>
            <Text style={styles.detailsText}> {date ? date.split(',').join(', '): null} </Text>
            <Text style={styles.detailsText}> Organizer: {organizer} </Text>
          </View>
          <View style={styles.rsvpContainer}>
            <Text> Attending? </Text>
              <TextButton title={"Yes"} color={this.state.attending ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)'}
              onPress={() => {
                this.setState({
                  attending: true
                })
              }}/>
              <TextButton title={"No"} color={this.state.attending ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,.1)'}
              onPress={() => {
                this.setState({
                  attending: false
                })
              }}/>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          {!this.state.seeFullDescription &&
            <Text textAlign={'left'} numberOfLines={2}
              renderTruncatedFooter={"..."}
              style={{minWidth: '100%'}}>
              {description} </Text>}
          {this.state.seeFullDescription &&
            <Text textAlign={'left'}
            style={{minWidth: '100%'}}>
            {description} </Text>}
            <View style={styles.divider} />
            <View style={{display:'flex', padding:6, alignItems:'flex-end', minWidth:'100%'}}>
              <TouchableHighlight
                onPress={() => {
                  this.setState({
                    seeFullDescription: !this.state.seeFullDescription
                  })
                }}>
                <Text> {this.state.seeFullDescription ? 'Show Less' : 'Show More'} </Text>
              </TouchableHighlight>
            </View>
        </View>

        <Map
          initialRegion={{
            latitude: this.props.navigation.state.params.lat,
            longitude: this.props.navigation.state.params.lng,
            latitudeDelta: LAT_DELTA,
            longitudeDelta: LNG_DELTA
          }}/>
        <View style={{height: 60}} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    minHeight: '100%'
  },
  header: {
    width: '100%',
    paddingLeft: 5,
    paddingRight: 10,
    paddingTop: 10,
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: .5
  },
  eventName: {
    fontSize: 25,
    marginTop: 7,
    marginBottom: 4,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 7,
    backgroundColor: '#FFF'
  },
  detailsText: {
    color: '#333',
    paddingBottom: 2
  },
  rsvpContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFF',
    paddingBottom: 7,
    paddingLeft: 5
  },
  divider: {
    backgroundColor: '#ccc',
    height: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 3
  },
  descriptionContainer: {
    backgroundColor: '#FFF',
    marginBottom: 10,
    padding: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: .5
  }
})

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    currentEvent: state.currentEvent
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
