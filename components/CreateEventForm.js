import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { FormLabel, FormInput, SearchBar } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PLACES = 'AIzaSyCo9YcZlx8POaoqjHVG2aTKThuoyCRjsVc';

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: ''
    }
    this.updateEventName = this.updateEventName.bind(this);
  }

  updateEventName(txt) {
    this.setState({ name: txt });
    console.log(txt)
  }

  render() {
    return(
      <View style={styles.container}>
        <FormLabel> Event Name </FormLabel>
        <FormInput style={styles.input} onChangeText={this.updateEventName}/>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  input: {
    padding: 5
  }
});


export default CreateEventForm;
