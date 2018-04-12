import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, SearchBar } from 'react-native-elements';
import { TextButton } from 'react-native-material-buttons';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as eventActions from '../actions/events';
import * as modalActions from '../actions/modal';

const PLACES = 'AIzaSyCo9YcZlx8POaoqjHVG2aTKThuoyCRjsVc';

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '2018-04-12',
      time: '10:00',
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
    //console.log(this.props)
    //console.log("Props socket reducer: ", this.props.socket)
    //console.log("Props socket socket: ", this.props.socket.socket)
    console.log("GOT USERNAME", this.props.auth.username)
    console.log("GOT USERID", this.props.auth.userId)
    return(
        <Modal
        transparent={false}
        visible={this.props.modal.createEventModal}
        onRequestClose={ () => {
          console.log('Modal has been closed.');
        }}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.closeButtonStyle}>
              <TouchableOpacity
              onPress={ () => {
                this.props.setCreateEventModal(false);
              }}>
                <Icon name='clear' size={30} />
              </TouchableOpacity>
            </View>
            <FormLabel> Name </FormLabel>
            <FormInput inputStyle={styles.input}
              containerStyle={styles.inputContainer}
              onChangeText={this.updateEventName}
              underlineColorAndroid={'#4AB169'}/>
            <FormLabel> Description </FormLabel>
            <FormInput multiline
              inputStyle={styles.input}
              containerStyle={styles.descriptionContainer}
              onChangeText={this.updateEventDescription} underlineColorAndroid={'#4AB169'}/>
            <DatePicker
              style={{width: 200}}
              date={this.state.date}
              mode="date"
              placeholder="Select date"
              format="YYYY-MM-DD"
              minDate="2018-01-01"
              maxDate="2070-01-01"
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
              format="HH:mm"
              is24Hour={false}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              minuteInterval={10}
              iconComponent={<Icon name='access-time' size={30}  style={{marginLeft: 3}} />}
              onDateChange={(time) => {
                this.setState( { time })
              }}
            />
            <FormLabel> Tags </FormLabel>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} contentContainerStyle={styles.tagsContainer}>
              <TextButton title="Social"
                color={this.state.tags.includes("Social") ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)'}
                onPress={() => {
                  if (this.state.tags.includes("Social")) {
                    this.setState({
                      tags: this.state.tags.filter(word => word !== 'Social')
                    })
                  } else {
                    this.setState({ tags: [...this.state.tags, "Social"]})
                  }
                }}/>
              <TextButton title="Party"
                color={this.state.tags.includes("Party") ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)'}
                onPress={() => {
                  if (this.state.tags.includes("Party")) {
                    this.setState({
                      tags: this.state.tags.filter(word => word !== 'Party')
                    })
                  } else {
                    this.setState({ tags: [...this.state.tags, "Party"]})
                  }
                }}/>
                <TextButton title="Free"
                  color={this.state.tags.includes("Free") ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)'}
                  onPress={() => {
                    if (this.state.tags.includes("Free")) {
                      this.setState({
                        tags: this.state.tags.filter(word => word !== 'Free')
                      })
                    } else {
                      this.setState({ tags: [...this.state.tags, "Free"]})
                    }
                  }}/>
              <TextButton title="Volunteer"
                color={this.state.tags.includes("Volunteer") ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)'}
                onPress={() => {
                  if (this.state.tags.includes("Volunteer")) {
                    this.setState({
                      tags: this.state.tags.filter(word => word !== 'Volunteer')
                    })
                  } else {
                    this.setState({ tags: [...this.state.tags, "Volunteer"]})
                  }
                }}/>
              <TextButton title="Food"
                color={this.state.tags.includes("Food") ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)'}
                onPress={() => {
                  if (this.state.tags.includes("Food")) {
                    this.setState({
                      tags: this.state.tags.filter(word => word !== 'Food')
                    })
                  } else {
                    this.setState({ tags: [...this.state.tags, "Food"]})
                  }
                }}/>
              <TextButton title="Activism"
                color={this.state.tags.includes("Activism") ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)'}
                onPress={() => {
                  if (this.state.tags.includes("Activism")) {
                    this.setState({
                      tags: this.state.tags.filter(word => word !== 'Activism')
                    })
                  } else {
                    this.setState({ tags: [...this.state.tags, "Activism"]})
                  }
                }}/>
                <TextButton title="Music"
                  color={this.state.tags.includes("Music") ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)'}
                  onPress={() => {
                    if (this.state.tags.includes("Music")) {
                      this.setState({
                        tags: this.state.tags.filter(word => word !== 'Music')
                      })
                    } else {
                      this.setState({ tags: [...this.state.tags, "Music"]})
                    }
                  }}/>
                <TextButton title="Art"
                  color={this.state.tags.includes("Art") ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)'}
                  onPress={() => {
                    if (this.state.tags.includes("Art")) {
                      this.setState({
                        tags: this.state.tags.filter(word => word !== 'Art')
                      })
                    } else {
                      this.setState({ tags: [...this.state.tags, "Art"]})
                    }
                  }}/>
                <TextButton title="Games"
                  color={this.state.tags.includes("Games") ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)'}
                  onPress={() => {
                    if (this.state.tags.includes("Games")) {
                      this.setState({
                        tags: this.state.tags.filter(word => word !== 'Games')
                      })
                    } else {
                      this.setState({ tags: [...this.state.tags, "Games"]})
                    }
                  }}/>
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
            <View style={styles.submitButtonStyle}>
              <Button title="Create" color={'#4AB169'} onPress={() => {
                if (this.state.name && this.state.address && this.state.date) {
                  var newHap = {
                    name: this.state.name,
                    description: this.state.description,
                    lat: this.state.lat,
                    lng: this.state.lng,
                    loc: [this.state.lng, this.state.lat],
                    placeId: this.state.placeId,
                    address: this.state.address,
                    dateTime: this.state.date + "T" + this.state.time,
                    tags: this.state.tags,
                    organizer: this.props.auth.username,
                    organizerId: this.props.auth.userId }
                  this.props.createNewHapSocket(this.props.socket.socket, newHap)
                  //this.props.addEvent(newHap);
                  this.props.setCreateEventModal(false);
                }
                else {
                  console.log('missing a required field')
                  // TOAST: 'missing required field' / validation error/ etc
                }
              }}/>
            </View>
          </ScrollView>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fafff9',
    paddingTop: 60
  },
  input: {
    paddingLeft: 10,
    width: 295,
    marginBottom: 10,
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
    alignItems: 'flex-end'
  },
  tagsContainer: {
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
