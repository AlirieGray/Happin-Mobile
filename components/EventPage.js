import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import * as eventActions from '../actions/events';
import * as locationActions from '../actions/location';
import Map from './Map';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextButton } from 'react-native-material-buttons';
import { Button } from 'react-native-elements';

// details for Google Maps View
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LAT_DELTA = 0.008;
const LNG_DELTA = LAT_DELTA / ASPECT_RATIO;
const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const mapStyle = {
    height: 400,
    width: '100%'
}

const Left = ({ onPress }) => (
  <TouchableOpacity onPress={() => {
    onPress()
  }}>
    <Icon name="arrow-back" size={30} color={'#FFF'} style={{padding: 10}}/>
  </TouchableOpacity>
);

class EventPage extends Component {
  constructor(props){
    super(props);

    this.state  = {
      markers: [],
      attending: false,
      seeFullDescription: false,
      gotLocation: false,
      latitude: this.props.latitude,
      longitude: this.props.longitude
    }
  }

  componentDidMount() {
    this.props.getEventById(this.props.navigation.state.params.id);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("USER POSITION IN EVENT PAGE", position)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          gotLocation: true
        })
        this.props.setLocation(position.coords)
      },
      (error) => console.log( error.message ),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    headerStyle: {
      backgroundColor: '#4AB169',
      paddingTop: 30,
      paddingBottom: 15,
      height: 80,
    },
    headerTitleStyle: {
      fontSize: 20,
      color: '#FFF'
    },
    headerLeft: <Left onPress={navigation.goBack} />
  });

  render() {
    const { name, address, description, organizer, dateFormatted } = this.props.currentEvent;
    console.log("raw date: ", this.props.currentEvent.date)

    return(
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.details}>
            <Text style={styles.detailsText}> Organizer: {organizer} </Text>
            <Text style={styles.detailsText}> {address} </Text>
            <Text style={styles.detailsText}> {dateFormatted} </Text>
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
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    seeFullDescription: !this.state.seeFullDescription
                  })
                }}>
                <Text> {this.state.seeFullDescription ? 'Show Less' : 'Show More'} </Text>
              </TouchableOpacity>
            </View>
        </View>

        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%'}}>
          <TouchableOpacity onPress={() => {
            console.log("Adding Marker!")
            this.setState({
              markers: [...this.state.markers, {lat: this.state.latitude, lng: this.state.longitude, name: "PIN"}]
            })
          }}>
            <Icon name="add-location" size={30} style={{padding: 10}}/>
          </TouchableOpacity>
        </View>

        <Map
          mapHeight={400}
          droppedPins={this.state.markers}
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
    backgroundColor: '#fafff9',
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
    currentEvent: state.currentEvent,
    location: state.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, eventActions, locationActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
