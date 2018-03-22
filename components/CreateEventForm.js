import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native';
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
const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '',
      time: '',
      lat: 0,
      lng: 0,
      placeId: '',
      address: '',
      description: '',
      formattedDate: '',
      tags: []
    }
    this.updateEventName = this.updateEventName.bind(this);
    this.updateEventDescription = this.updateEventDescription.bind(this);
    this.parseDate = this.parseDate.bind(this);
  }

  updateEventName(txt) {
    this.setState({ name: txt });
  }

  updateEventDescription(txt) {
    this.setState({ description: txt });
  }

  // returns a formatted date string
  parseDate(dateString) {
    if (dateString) {
      var dateSections = dateString.split('/');
      var jsDate = new Date(dateSections[2], dateSections[0] - 1, dateSections[1]);
      return weekdays[jsDate.getDay()] + ',' + months[jsDate.getMonth()] + ' ' + jsDate.getDate() + ',' + jsDate.getFullYear();
    }
  }

  render() {
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
            <FormInput inputStyle={styles.input} containerStyle={styles.inputContainer} onChangeText={this.updateEventName}/>
            <FormLabel> Description </FormLabel>
            <FormInput multiline inputStyle={styles.input} containerStyle={styles.descriptionContainer} onChangeText={this.updateEventDescription}/>
            <DatePicker
              style={{width: 200}}
              date={this.state.date}
              mode="date"
              placeholder="Select date"
              format="MM/DD/YYYY"
              minDate="01/01/2018"
              maxDate="01/01/2050"
              confirmBtnText="Confirm"
              iconComponent={<Icon name='event' size={30} style={{marginBottom: 20, marginLeft: 3}} />}
              customStyles={{
                dateInput: {
                  marginBottom: 25
                },
              }}
              cancelBtnText="Cancel"
              onDateChange={(date) => {
                const formattedDate = this.parseDate(date);
                this.setState({ formattedDate });
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
                this.setState( {time: time})
              }}
            />
            <FormLabel> Tags </FormLabel>
            <ScrollView horizontal={true}>
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
              <TextButton title="Environment"
                color={this.state.tags.includes("Environment") ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)'}
                onPress={() => {
                  if (this.state.tags.includes("Environment")) {
                    this.setState({
                      tags: this.state.tags.filter(word => word !== 'Environment')
                    })
                  } else {
                    this.setState({ tags: [...this.state.tags, "Environment"]})
                  }
                }}/>
              <TextButton title="Labor"
                color={this.state.tags.includes("Labor") ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)'}
                onPress={() => {
                  if (this.state.tags.includes("Labor")) {
                    this.setState({
                      tags: this.state.tags.filter(word => word !== 'Labor')
                    })
                  } else {
                    this.setState({ tags: [...this.state.tags, "Labor"]})
                  }
                }}/>
              <TextButton title="Global"
                color={this.state.tags.includes("Global") ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)'}
                onPress={() => {
                  if (this.state.tags.includes("Global")) {
                    this.setState({
                      tags: this.state.tags.filter(word => word !== 'Global')
                    })
                  } else {
                    this.setState({ tags: [...this.state.tags, "Global"]})
                  }
                }}/>
              <TextButton title="Health"
                color={this.state.tags.includes("Health") ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)'}
                onPress={() => {
                  if (this.state.tags.includes("Health")) {
                    this.setState({
                      tags: this.state.tags.filter(word => word !== 'Health')
                    })
                  } else {
                    this.setState({ tags: [...this.state.tags, "Health"]})
                  }
                }}/>
              <TextButton title="Political"
                color={this.state.tags.includes("Political") ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,0)'}
                onPress={() => {
                  if (this.state.tags.includes("Political")) {
                    this.setState({
                      tags: this.state.tags.filter(word => word !== 'Political')
                    })
                  } else {
                    this.setState({ tags: [...this.state.tags, "Political"]})
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
              ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              debounce={200}
            />
            <View style={styles.submitButtonStyle}>
              <Button title="Create" onPress={() => {
                if (this.state.name && this.state.address && this.state.date) {
                  var newEvent = {
                    name: this.state.name,
                    description: this.state.description,
                    lat: this.state.lat,
                    lng: this.state.lng,
                    placeId: this.state.placeId,
                    address: this.state.address,
                    date: this.state.formattedDate,
                    tags: this.state.tags,
                    userId: this.props.auth.userId }
                  this.props.addEvent(newEvent);
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
    backgroundColor: '#F5F5F5',
    paddingTop: 60
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
  submitButtonStyle: {
    margin: 20
  },
  closeButtonStyle: {
    display: 'flex',
    width: 300,
    alignItems: 'flex-end'
  },
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row'
  }
});


const mapStateToProps = (state) => {
  return {
    events: state.events,
    auth: state.auth,
    modal: state.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, eventActions, modalActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventForm);
