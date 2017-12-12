import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { FormLabel, FormInput, SearchBar } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places';

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
        <FormInput onChangeText={this.updateEventName}/>
        <DatePicker
          style={styles.dateStyle}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 30,
              marginTop: 15
            },
            dateInput: {
              marginLeft: 66,
              marginTop: 25
            }

          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
        <Button title="Submit" onPress={() => {console.log('submitting')}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 600
  },
  dateStyle: {
    width: 300
  }
})


export default CreateEventForm;
