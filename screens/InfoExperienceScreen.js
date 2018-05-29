import React from 'react';
import { ScrollView, StyleSheet,
        ImageBackground, Text, View, TouchableOpacity  } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import firebase from '@firebase/app';
import '@firebase/firestore';

export default class InfoExperienceScreen extends React.Component {
  state = {
    isDateTimePickerVisible: false,
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

 _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

 _handleDatePicked = (date) => {
   console.log('A date has been picked: ', date);
   this._hideDateTimePicker();
 };

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: 'Experience',
      headerStyle: {
        backgroundColor: '#add8e6',
        borderBottomWidth: 0,
      },
      headerTitleStyle: { color: '#4B5D63' },
    };
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/background_gradient.jpg')}
        style={{width: '100%', height: '103%'}}
      >

          <View style={{ flex: 1 }}>
            <Button onPress={this._showDateTimePicker}
              buttonStyle={{
                backgroundColor: 'transparent',
                width: 320,
                borderColor: "#fff",
                borderWidth: 1,
              }}
              textStyle={{ fontSize: 20, fontFamily: 'century-gothic' }}
              //title="Start Shift"
              color='#4B5D63'
              underlayColor='#fff'
            >
              <Text>Show DatePicker</Text>
            </Button>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />
          </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
