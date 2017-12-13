import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, SearchBar } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PLACES = 'AIzaSyCo9YcZlx8POaoqjHVG2aTKThuoyCRjsVc';

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '',
      time: '',
      lat: 0,
      lng: 0,
      address: '',
      description: ''
    }
    this.updateEventName = this.updateEventName.bind(this);
    this.updateEventDescription = this.updateEventDescription.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Create an Event',
    headerStyle:{
      backgroundColor: '#F44336'
    },
    headerBackTitleStyle: {
      color: 'black'
    },
    headerTintColor: 'black'
  });

  updateEventName(txt) {
    this.setState({ name: txt });
    console.log(txt)
  }

  updateEventDescription(txt) {
    this.setState({ description: txt });
  }

  render() {
    return(
      <View style={styles.container}>
        <FormLabel> Name </FormLabel>
        <FormInput inputStyle={styles.input} containerStyle={styles.inputContainer} onChangeText={this.updateEventName}/>
        <FormLabel> Description </FormLabel>
        <FormInput inputStyle={styles.input} containerStyle={styles.inputContainer} onChangeText={this.updateEventDescription}/>
        <DatePicker
          style={{width: 200}}
          date={this.state.date}
          mode="date"
          placeholder="Select date"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate="2016-06-01"
          confirmBtnText="Confirm"
          iconComponent={<Icon name='event' size={30} />}
          customStyles={{
            dateInput: {
              marginBottom: 15
            }
          }}
          cancelBtnText="Cancel"
          onDateChange={(date) => {this.setState({date: date});}}
        />
        <DatePicker
          style={{width: 200}}
          date={this.state.time}
          mode="time"
          format="HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          minuteInterval={10}
          iconComponent={<Icon name='access-time' size={30} />}
          onDateChange={(time) => {this.setState({time: time});}}
        />
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data);
            console.log(details);
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
          }}
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food',
          }}
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          debounce={200}
        />
        <Button title="Submit" onPress={() => {console.log('submitting')}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5'
  },
  input: {
    paddingLeft: 10
  },
  inputContainer: {
    marginBottom: 15,
    width: 300
  },
});


export default CreateEventForm;
