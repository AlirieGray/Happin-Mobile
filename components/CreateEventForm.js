import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, SearchBar } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places';
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
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Create an Event'
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
        <Button title="Submit" onPress={() => {console.log('submitting')}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
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
