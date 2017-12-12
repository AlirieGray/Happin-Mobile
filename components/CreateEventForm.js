import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.updateEventName = this.updateEventName.bind(this);
  }

  updateEventName() {

  }

  render() {
    return(
      <View>
        <FormLabel> Event Name </FormLabel>
        <FormInput onChangeText={updateEventName}/>
      </View>
    );
  }
}

export default CreateEventForm;
