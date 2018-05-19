import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Alert,
  ImageBackground,
  ScrollView,
  AsyncStorage
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Form from 'react-native-form';
import CountryPicker from 'react-native-country-picker-modal';
import firebase from 'firebase'
import axios from 'axios';


const MAX_LENGTH_CODE = 6;
const MAX_LENGTH_NUMBER = 20;
// if you want to customize the country picker
const countryPickerCustomStyles = {};
// your brand's theme primary color
const brandColor = '#4B5D63';
//Firebase functions url
const URL = 'https://us-central1-drink-and-drive.cloudfunctions.net';

export default class example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone:'',
      code: '',
      enterCode: false,
      spinner: false,
      country: {
        cca2: 'DK',
        callingCode: '45'
      }
    };
  }

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyAZzqPWgp3AfMfnYOS9_TPofwfBT716Qrk",
      authDomain: "drink-and-drive.firebaseapp.com",
      databaseURL: "https://drink-and-drive.firebaseio.com",
      projectId: "drink-and-drive",
      storageBucket: "drink-and-drive.appspot.com",
      messagingSenderId: "943601859777"
    };

    firebase.initializeApp(config);
  }

  _getCode = () => {

    const phoneNumber = this.refs.form.getValues()["phoneNumber"];

    this.setState({
      spinner: true,
      phone: phoneNumber
    });

    setTimeout(async () => {

      try {
        await axios.post(`${URL}/createUser`,{ phone: phoneNumber });
        await axios.post(`${URL}/requestPassword`,{ phone: phoneNumber });

        this.setState({
          spinner: false,
          enterCode: true
        });

        this.refs.form.refs.textInput.setNativeProps({ text: '' });

        setTimeout(() => {
          Alert.alert('Sent!', "We've sent you a verification code", [{
            text: 'OK',
            onPress: () => this.refs.form.refs.textInput.focus()
          }]);
        }, 100);

      } catch (err) {
        // <https://github.com/niftylettuce/react-native-loading-spinner-overlay/issues/30#issuecomment-276845098>
        this.setState({ spinner: false });
        setTimeout(() => {
          Alert.alert('Oops!', err.message);
        }, 100);
      }

    }, 100);

  }

  _verifyCode = () => {

    let authCode = this.refs.form.getValues()["code"];

    this.setState({
      spinner: true,
      code: authCode,
     });

     setTimeout(async () => {

      try {

         let { data } = await axios.post(`${URL}/verifyPassword`, {
           phone: this.state.phone, code: authCode
         });

        await AsyncStorage.setItem('userToken', JSON.stringify(data));

        this.refs.form.refs.textInput.blur();
        this.setState({ spinner: false });
        setTimeout(() => {
          Alert.alert('Success!', 'You have successfully verified your phone number');
        }, 100);

        this.props.navigation.navigate('Main');

      } catch (err) {
        this.setState({ spinner: false });
        setTimeout(() => {
          Alert.alert('Oops!', err.message);
        }, 100);
      }
    }, 100);
  }

  _onChangeText = (val) => {
    if (!this.state.enterCode) return;
  }

  _tryAgain = () => {
    this.refs.form.refs.textInput.setNativeProps({ text: '' })
    this.refs.form.refs.textInput.focus();
    this.setState({ enterCode: false });
  }

  _getSubmitAction = () => {
    this.state.enterCode ? this._verifyCode() : this._getCode();
  }

  _changeCountry = (country) => {
    this.setState({ country });
    this.refs.form.refs.textInput.focus();
  }

  _renderFooter = () => {

    if (this.state.enterCode)
      return (
        <View>
          <Text style={styles.wrongNumberText} onPress={this._tryAgain}>
            Enter the wrong number or need a new code?
          </Text>
        </View>
      );

    return (
      <View>
        <Text style={styles.disclaimerText}>By tapping "Send confirmation code" above, we will send you an SMS to confirm your phone number. Message &amp; data rates may apply.</Text>
      </View>
    );

  }

  _renderCountryPicker = () => {

    if (this.state.enterCode)
      return (
        <View />
      );

    return (
      <CountryPicker
        ref={'countryPicker'}
        closeable
        style={styles.countryPicker}
        onChange={this._changeCountry}
        cca2={this.state.country.cca2}
        styles={countryPickerCustomStyles}
        translation='eng'/>
    );

  }

  _renderCallingCode = () => {

    if (this.state.enterCode)
      return (
        <View />
      );

    return (
      <View style={styles.callingCodeView}>
        <Text style={styles.callingCodeText}> +{this.state.country.callingCode}</Text>
      </View>
    );

  }

  render() {

    let headerText = `What's your ${this.state.enterCode ? 'verification code' : 'phone number'}?`
    let buttonText = this.state.enterCode ? 'Verify confirmation code' : 'Send confirmation code';
    let textStyle = this.state.enterCode ? {
      height: 50,
      textAlign: 'center',
      fontSize: 40,
      fontWeight: 'bold',
      fontFamily: 'Courier'
    } : {};

    return (
      <ImageBackground
        source={require('../assets/images/background_gradient.jpg')}
        imageStyle={{resizeMode:'stretch'}}
        style={styles.backgroundImage}
      >
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps='always'
        >

          <Text style={styles.header}>{headerText}</Text>

          <Form ref={'form'} style={styles.form}>

            <View style={{ flexDirection: 'row' }}>

              {this._renderCountryPicker()}
              {this._renderCallingCode()}

              <TextInput
                ref={'textInput'}
                name={this.state.enterCode ? 'code' : 'phoneNumber' }
                type={'TextInput'}
                underlineColorAndroid={'transparent'}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={this._onChangeText}
                placeholder={this.state.enterCode ? '_ _ _ _ _ _' : 'Phone Number'}
                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                style={[ styles.textInput, textStyle ]}
                returnKeyType='go'
                autoFocus
                placeholderTextColor={brandColor}
                selectionColor={brandColor}
                maxLength={this.state.enterCode ? 6 : 20}
                onSubmitEditing={this._getSubmitAction} />

            </View>

            <TouchableOpacity style={styles.button} onPress={() => this._getSubmitAction()}>
              <Text style={styles.buttonText}>{ buttonText }</Text>
            </TouchableOpacity>

            {this._renderFooter()}

          </Form>

          <Spinner
            visible={this.state.spinner}
            textContent={'One moment...'}
            textStyle={{ color: '#fff' }} />

        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  countryPicker: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    marginTop: 50
  },
  header: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 22,
    margin: 20,
    color: '#4A4A4A',
  },
  form: {
    margin: 20
  },
  textInput: {
    padding: 0,
    margin: 0,
    flex: 1,
    fontSize: 20,
    color: brandColor
  },
  button: {
    marginTop: 20,
    height: 50,
    borderWidth: 1,
    borderColor: brandColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: brandColor,
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 'bold'
  },
  wrongNumberText: {
    margin: 10,
    fontSize: 14,
    textAlign: 'center'
  },
  disclaimerText: {
    marginTop: 30,
    fontSize: 12,
    color: 'grey'
  },
  callingCodeView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  callingCodeText: {
    fontSize: 20,
    color: brandColor,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    paddingRight: 10
  }
});
