import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, SearchBar } from 'react-native-elements';
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast, {DURATION} from 'react-native-easy-toast';
import * as eventActions from '../actions/events';
import * as modalActions from '../actions/modal';

const PLACES = 'AIzaSyCo9YcZlx8POaoqjHVG2aTKThuoyCRjsVc';

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '04/18/2018',
      time: '5:00: pm',
      lat: 0,
      lng: 0,
      placeId: '',
      address: '',
      description: '',
      tags: []
    }
    this.updateEventName = this.updateEventName.bind(this);
    this.updateEventDescription = this.updateEventDescription.bind(this);
  }

  updateEventName(txt) {
    this.setState({ name: txt });
  }

  updateEventDescription(txt) {
    this.setState({ description: txt });
  }


  render() {
    return(
        <Modal
        transparent={true}
        visible={this.props.modal.createEventModal}
        onRequestClose={ () => {
          console.log('Modal has been closed.');
        }}>
          <View style={styles.outer}>
            <ScrollView contentContainerStyle={styles.container}>
              <View style={styles.closeButtonStyle}>
                <TouchableOpacity
                onPress={ () => {
                  this.props.setCreateEventModal(false);
                  this.setState({
                    tags: []
                  })
                }}>
                  <Icon name='clear' size={30} color={'#aaa'}/>
                </TouchableOpacity>
              </View>
              <FormInput inputStyle={styles.input}
                placeholder={"Name"}
                containerStyle={styles.inputContainer}
                onChangeText={this.updateEventName}
                underlineColorAndroid={'#4AB169'}/>
              <FormInput multiline
                inputStyle={styles.input}
                placeholder={"Description"}
                containerStyle={styles.descriptionContainer}
                onChangeText={this.updateEventDescription} underlineColorAndroid={'#4AB169'}/>
              <DatePicker
                style={{width: 200}}
                date={this.state.date}
                mode="date"
                placeholder="Select date"
                format="MM/DD/YYYY"
                minDate="01/01/2018"
                maxDate="01/01/2070"
                confirmBtnText="Confirm"
                iconComponent={<Icon name='event' size={30} style={{marginBottom: 20, marginLeft: 3}} />}
                customStyles={{
                  dateInput: {
                    marginBottom: 25
                  },
                }}
                cancelBtnText="Cancel"
                onDateChange={(date) => {
                  this.setState({ date });
                }}
              />
              <DatePicker
                style={{width: 200, marginBottom: 25}}
                date={this.state.time}
                mode="time"
                format="hh:mm: a"
                is24Hour={false}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                minuteInterval={10}
                iconComponent={<Icon name='access-time' size={30}  style={{marginLeft: 3}} />}
                onDateChange={(time) => {
                  console.log(time)
                  this.setState( { time })
                }}
              />
              <FormLabel> Tags </FormLabel>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} contentContainerStyle={styles.tagsContainer}>
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    margin: 2,
                    backgroundColor:
                      this.state.tags.includes("Social") ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 3,
                  }}
                  onPress={() => {
                    if (this.state.tags.includes("Social")) {
                      this.setState({
                        tags: this.state.tags.filter(word => word !== 'Social')
                      })
                    } else {
                      this.setState({ tags: [...this.state.tags, "Social"]})
                    }
                  }}>
                    <Text style={{color: '#aaa'}}> Social </Text>
                  </TouchableOpacity>
                <TouchableOpacity title="Party"
                  style={{
                    borderRadius: 10,
                    margin: 2,
                    backgroundColor:
                      this.state.tags.includes("Party") ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 3,
                  }}
                  onPress={() => {
                    if (this.state.tags.includes("Party")) {
                      this.setState({
                        tags: this.state.tags.filter(word => word !== 'Party')
                      })
                    } else {
                      this.setState({ tags: [...this.state.tags, "Party"]})
                    }
                  }}>
                    <Text style={{color: '#aaa'}}> Party </Text>
                  </TouchableOpacity>
                  <TouchableOpacity title="Free"
                    style={{
                      borderRadius: 10,
                      margin: 2,
                      backgroundColor:
                        this.state.tags.includes("Free") ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: 3,
                    }}
                    onPress={() => {
                      if (this.state.tags.includes("Free")) {
                        this.setState({
                          tags: this.state.tags.filter(word => word !== 'Free')
                        })
                      } else {
                        this.setState({ tags: [...this.state.tags, "Free"]})
                      }
                    }}>
                      <Text style={{color: '#aaa'}}> Free </Text>
                    </TouchableOpacity>
                <TouchableOpacity title="Volunteer"
                  style={{
                    borderRadius: 10,
                    margin: 2,
                    backgroundColor:
                      this.state.tags.includes("Volunteer") ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 3,
                  }}
                  onPress={() => {
                    if (this.state.tags.includes("Volunteer")) {
                      this.setState({
                        tags: this.state.tags.filter(word => word !== 'Volunteer')
                      })
                    } else {
                      this.setState({ tags: [...this.state.tags, "Volunteer"]})
                    }
                  }}>
                    <Text style={{color: '#aaa'}}> Volunteer </Text>
                  </TouchableOpacity>
                <TouchableOpacity title="Food"
                  style={{
                    borderRadius: 10,
                    margin: 2,
                    backgroundColor:
                      this.state.tags.includes("Food") ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 3,
                  }}
                  onPress={() => {
                    if (this.state.tags.includes("Food")) {
                      this.setState({
                        tags: this.state.tags.filter(word => word !== 'Food')
                      })
                    } else {
                      this.setState({ tags: [...this.state.tags, "Food"]})
                    }
                  }}>
                    <Text style={{color: '#aaa'}}> Food </Text>
                  </TouchableOpacity>
                <TouchableOpacity title="Activism"
                  style={{
                    borderRadius: 10,
                    margin: 2,
                    backgroundColor:
                      this.state.tags.includes("Activism") ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 3,
                  }}
                  onPress={() => {
                    if (this.state.tags.includes("Activism")) {
                      this.setState({
                        tags: this.state.tags.filter(word => word !== 'Activism')
                      })
                    } else {
                      this.setState({ tags: [...this.state.tags, "Activism"]})
                    }
                  }}>
                    <Text style={{color: '#aaa'}}> Activism </Text>
                  </TouchableOpacity>
                  <TouchableOpacity title="Music"
                    style={{
                      borderRadius: 10,
                      margin: 2,
                      backgroundColor:
                        this.state.tags.includes("Music") ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: 3,
                    }}
                    onPress={() => {
                      if (this.state.tags.includes("Music")) {
                        this.setState({
                          tags: this.state.tags.filter(word => word !== 'Music')
                        })
                      } else {
                        this.setState({ tags: [...this.state.tags, "Music"]})
                      }
                    }}>
                      <Text style={{color: '#aaa'}}> Music </Text>
                    </TouchableOpacity>
                  <TouchableOpacity title="Art"
                    style={{
                      borderRadius: 10,
                      margin: 2,
                      backgroundColor:
                        this.state.tags.includes("Art") ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: 3,
                    }}
                    onPress={() => {
                      if (this.state.tags.includes("Art")) {
                        this.setState({
                          tags: this.state.tags.filter(word => word !== 'Art')
                        })
                      } else {
                        this.setState({ tags: [...this.state.tags, "Art"]})
                      }
                    }}>
                      <Text style={{color: '#aaa'}}> Art </Text>
                    </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderRadius: 10,
                      margin: 2,
                      backgroundColor:
                        this.state.tags.includes("Games") ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: 3,
                    }}
                    onPress={() => {
                      if (this.state.tags.includes("Games")) {
                        this.setState({
                          tags: this.state.tags.filter(word => word !== 'Games')
                        })
                      } else {
                        this.setState({ tags: [...this.state.tags, "Games"]})
                      }
                    }}>
                      <Text style={{color: '#aaa'}}> Games </Text>
                    </TouchableOpacity>
              </ScrollView>
              <FormLabel> Location </FormLabel>
              <GooglePlacesAutocomplete
                placeholder="Search for location"
                minLength={2}
                autoFocus={false}
                fetchDetails={true}
                returnKeyType={'default'}
                renderDescription={row => row.description}
                onPress={(data, details) => {
                  var splitAddress = details.formatted_address.split(',');
                  var shortAddress = splitAddress.splice(0, 2).join(',');
                  this.setState({
                    address: shortAddress,
                    placeId: data.place_id,
                    lat: details.geometry.location.lat,
                    lng: details.geometry.location.lng
                  })
                }}
                getDefaultValue={() => {
                  return ''; // text input default value
                }}
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: 'AIzaSyCo9YcZlx8POaoqjHVG2aTKThuoyCRjsVc',
                  language: 'en',
                }}
                styles={{
                  textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    borderBottomWidth:0,
                    minWidth: '100%'
                  },
                  textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: '#5d5d5d',
                    fontSize: 16,
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb'
                  },
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                filterReverseGeocodingByTypes={[
                  'locality',
                  'administrative_area_level_3',
                ]}
                debounce={200}
              />
              <Toast
                ref="toast"
                style={{backgroundColor:'#777', borderRadius: 20}}
                position='bottom'
                positionValue={190}
                fadeInDuration={750}
                fadeOutDuration={1000}
                opacity={1}
                textStyle={{color:'white'}}
              />
              <View style={styles.submitButtonStyle}>
                <RaisedTextButton title="Create"
                  color={'#4AB169'}
                  titleColor={"rgb(255,255,255)"} onPress={() => {
                  var splitTime = this.state.time.split(':');

                  // convert to 24 time
                  console.log(splitTime)
                  if (splitTime[2] == ' pm' && splitTime[0] !== '12') {
                    console.log("adding 12...")
                    splitTime[0] = parseInt(splitTime[0]) + 12;
                  }
                  var formattedTime = splitTime[0] + ':' + splitTime[1];
                  console.log("formatted time: ", formattedTime)
                  if (this.state.name && this.state.address && this.state.date && this.state.time) {
                    var newHap = {
                      name: this.state.name,
                      description: this.state.description,
                      lat: this.state.lat,
                      lng: this.state.lng,
                      loc: [this.state.lng, this.state.lat],
                      placeId: this.state.placeId,
                      address: this.state.address,
                      date: this.state.date,
                      time: formattedTime,
                      tags: this.state.tags,
                      organizer: this.props.auth.username,
                      organizerId: this.props.auth.userId }
                    this.props.createNewHapSocket(this.props.socket.socket, newHap)
                    //this.props.addEvent(newHap);
                    this.props.setCreateEventModal(false);
                    this.setState({
                      tags: []
                    })
                  }
                  else {
                    this.refs.toast.show('Missing a required field', 500)
                  }
                }}/>
              </View>
            </ScrollView>
          </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
    borderRadius: 3
  },
  input: {
    paddingLeft: 10,
    width: 295,
  },
  inputContainer: {
    marginBottom: 15,
    width: 300,
  },
  descriptionContainer: {
    marginBottom: 35,
    width: 300,
  },
  submitButtonStyle: {
    margin: 20
  },
  closeButtonStyle: {
    display: 'flex',
    width: 300,
    alignItems: 'flex-end',
    paddingTop: 10,
  },
  outer: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    paddingTop: 100,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  tagsContainer: {
    padding: 2
  }
});


const mapStateToProps = (state) => {
  return {
    events: state.events,
    auth: state.auth,
    modal: state.modal,
    socket: state.socket
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, eventActions, modalActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventForm);
