import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, SearchBar } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as eventActions from '../actions/events';
import * as modalActions from '../actions/modal';

const PLACES = 'AIzaSyCo9YcZlx8POaoqjHVG2aTKThuoyCRjsVc';

// const Left = ({ onPress }) => (
//   <TouchableHighlight onPress={() => {
//     onPress()
//   }}>
//     <Icon name="arrow-back" size={30} />
//   </TouchableHighlight>
// );

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
      description: ''
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
      <View>
        <Modal
        transparent={false}
        visible={this.props.modal.createEventModal}
        onRequestClose={ () => {
          console.log('Modal has been closed.');
        }}
        >
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.closeButtonStyle}>
              <TouchableOpacity
              onClick={() => {
                this.props.setCreateEventModal(false);
              }}>
                <Icon name='clear' size={30} />
              </TouchableOpacity>
            </View>
            <FormLabel> Name </FormLabel>
            <FormInput inputStyle={styles.input} containerStyle={styles.inputContainer} onChangeText={this.updateEventName}/>
            <FormLabel > Description </FormLabel>
            <FormInput multiline inputStyle={styles.input} containerStyle={styles.descriptionContainer} onChangeText={this.updateEventDescription}/>
            <DatePicker
              style={{width: 200}}
              date={this.state.date}
              mode="date"
              placeholder="Select date"
              format="YYYY-MM-DD"
              minDate="2018-01-01"
              maxDate="2050-06-01"
              confirmBtnText="Confirm"
              iconComponent={<Icon name='event' size={30} style={{marginBottom: 20, marginLeft: 3}} />}
              customStyles={{
                dateInput: {
                  marginBottom: 25
                },
              }}
              cancelBtnText="Cancel"
              onDateChange={(date) => {this.setState({date: date});}}
            />
            <DatePicker
              style={{width: 200, marginBottom: 25}}
              date={this.state.time}
              mode="time"
              format="HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              minuteInterval={10}
              iconComponent={<Icon name='access-time' size={30}  style={{marginLeft: 3}} />}
              onDateChange={(time) => {this.setState({time: time});}}
            />
            <FormLabel> Location </FormLabel>
            <Text> {this.state.address} </Text>
            <GooglePlacesAutocomplete
              placeholder="Search for location"
              minLength={2} // minimum length of text to search
              autoFocus={false}
              fetchDetails={true}
              returnKeyType={'default'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed='auto' // true/false/undefined
              renderDescription={row => row.description} // custom description render
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
                language: 'en', // language of the results
              }}
              styles={{
                description: {
                  fontWeight: 'bold',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
                textInput: {
                  width: 300
                }
              }}
              currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
              currentLocationLabel="Current location"
              nearbyPlacesAPI="GooglePlacesSearch"
              filterReverseGeocodingByTypes={[
                'locality',
                'administrative_area_level_3',
              ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              debounce={200}
            />
            <View style={styles.submitButtonStyle}>
              <Button title="Submit" onPress={() => {
                console.log('submitting');
                if (this.state.name && this.state.address && this.state.date) {
                  var newEvent = {
                    name: this.state.name,
                    description: this.state.description,
                    lat: this.state.lat,
                    lng: this.state.lng,
                    placeId: this.state.placeId,
                    address: this.state.address,
                    date: this.state.date,
                    userId: this.props.auth.userId }
                  this.props.addEvent(newEvent);
                  this.props.closeCreateEventModal();
                }
                else {
                  console.log('missing a required field')
                }
              }}/>
            </View>
          </ScrollView>
        </Modal>
      </View>
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
