import React from 'react';
import { Image, Platform, ScrollView, StyleSheet,
  Text, TouchableOpacity, View, Dimensions, Alert,
  ImageBackground, Picker, AsyncStorage, KeyboardAvoidingView, TouchableHighlight  } from 'react-native';
import { MonoText } from '../components/StyledText';
import * as Progress from 'react-native-progress';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Modal from 'react-native-modal';
import { FormInput, Button } from 'react-native-elements';
import { Stopwatch } from 'react-native-stopwatch-timer'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
    headerStyle: {
      backgroundColor: '#add8e6',
      borderBottomWidth: 0,
    },
    headerTitleStyle: { color: '#545454' },
  };

  constructor(props) {
    super(props);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    }

    toggleStopwatch() { //here enable the other button instead of toggling the same
      this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
    }

    resetStopwatch() {
      this.setState({stopwatchStart: false, stopwatchReset: true});
    }

    getFormattedTime(time) {
        this.currentTime = time;
    };


  componentDidMount() {
    this.setSemester();

  }

  setSemester() {
    global.semester = "sem02";
    global.uid = "+4560530103";
  }

  state = {
    progress: 20,
    progressWithOnComplete: 40,
    hours: 50,
    babies: 15,
    visibleModal: false,
    semester: '',
    input: '',
      stopwatchStart: false,
      totalDuration: 90000,
      timerReset: false,
      stopwatchReset: false,
  }

  onPressButtonHours = () => {
    if (this.state.hours <= 294) {
      this.setState({
          hours: this.state.hours + 6,
          progress: this.state.progress + 2,
      });
    } else {
      Alert.alert('Hey!', 'You have already fulfilled your hours!');
    }
  }

  onPressButtonBabies = () => {
    if(this.state.babies <= 39) {
      this.setState({
          babies: this.state.babies + 1,
          progressWithOnComplete: this.state.progressWithOnComplete + 2.5
      });
    }
  }

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text style={styles.labelInModal}>Name:</Text>
      <Picker
         style={{ height: 50, width: 100 }}
         onValueChange={(itemValue, itemIndex) => console.log(itemValue)}>
         <Picker.Item label="Semester 02" value="2" />
         <Picker.Item label="Semester 04" value="4" />
         <Picker.Item label="Semester 06" value="6" />
      </Picker>
      <Button onPress={() => this.createNewExperience()}
                title='Select'
                style={styles.button}/>
    </View>
  );

  render() {

    const barWidth = Dimensions.get('screen').width - 60;
    const handleTimerComplete = () => alert("custom completion function");
    const options = {
      container: {
        backgroundColor: 'transparent',
        padding: 5,
      },
      text: {
        fontSize: 18,
        fontFamily: 'century-gothic',
        color: '#fff',
        marginLeft: 130,
        marginTop: 10
      }
    };
      return (
      <ImageBackground source={require('../assets/images/background_gradient.jpg')}
      style={{width: '100%', height: '103%'}}>

        <View style={styles.container1}>
          <Modal
            isVisible={this.state.visibleModal}
            //backdropColor={'red'}
            //backdropOpacity={1}
            animationIn={'zoomInDown'}
            animationOut={'zoomOutUp'}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
            onBackdropPress={() => this.setState({ visibleModal: false })}
          >
            {this._renderModalContent()}
          </Modal>
        </View>

        <ScrollView>

          <View style={styles.container}>
              <View style={styles.firstBarContainer}>
                <Text style={styles.label}>Hours Spent {this.state.hours} / 300</Text>
                <ProgressBarAnimated
                  backgroundColor='#4B5D63'
                  borderColor='#85a1aa'
                  width={barWidth}
                  height= {10}
                  value={this.state.progress}
                  backgroundColorOnComplete="#496595"
                  barAnimationDuration={800}
                  borderRadius={0}
                />
              </View>
              <View style={styles.secondBarContainer}>
                <Text style={styles.label}>Babies Delivered {this.state.babies} / 40</Text>
                <ProgressBarAnimated
                  backgroundColor='#4B5D63'
                  borderColor='#85a1aa'
                  width={barWidth}
                  height= {10}
                  backgroundColorOnComplete="#496595"
                  barAnimationDuration={800}
                  borderRadius={0}
                  value={this.state.progressWithOnComplete}
                  onComplete={() => {
                    Alert.alert('Hey!', 'You have delivered 40 babies!');
                  }}
                />
              </View>

              <Stopwatch start={this.state.stopwatchStart}
                reset={this.state.stopwatchReset}
                getTime={this.getFormattedTime}
                options={options}/>

              <View style={styles.buttonsContainer}>
                <View>
                  <Button
                    buttonStyle={{
                      backgroundColor: 'transparent',
                      width: 130,
                      borderColor: "#fff",
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                    textStyle={{ fontSize: 20, fontFamily: 'century-gothic' }}
                    title="Start Shift"
                    color='#4B5D63'
                    underlayColor='#fff'
                    //onPress={this.onPressButtonHours.bind(this, 'hours')}
                    onPress={this.toggleStopwatch}
                  >{!this.state.stopwatchStart}
                  </Button>
                </View>
                <View>
                  <Button
                    buttonStyle={{
                      backgroundColor: 'transparent',
                      width: 130,
                      borderColor: "#fff",
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                    textStyle={{ fontSize: 20, fontFamily: 'century-gothic' }}
                    title="End Shift"
                    color='#4B5D63'
                    underlayColor='#fff'
                    //disabled={true}
                    //disabledStyle={{ backgroundColor: 'transparent', opacity: 0.6 }}
                    //onPress={this.onPressButtonBabies.bind(this, 'babies')}
                    onPress={this.resetStopwatch}
                  />
                </View>
              </View>

              <KeyboardAvoidingView
                behavior="position"
              >
                <View style={{ marginTop: 120 }}>
                  <Text style={styles.label1}>Babies delivered today:</Text>
                  <View style={{ flex: 1, flexDirection: 'row', width: 335 }}>
                    <FormInput
                     containerStyle={{
                       borderBottomWidth: 0,
                       height: 51,
                       backgroundColor: '#fff',
                       borderRadius: 5,
                       flex: 1,
                       justifyContent: 'center',
                       alignItems: 'center',
                       marginLeft: 22,
                       marginRight: 2,
                     }}
                     inputStyle={{
                       width: 110,
                       height: 51,
                       flex: 1,
                       justifyContent: 'center',
                       fontSize: 26,
                       fontFamily: 'century-gothic',
                       alignSelf: 'center',
                       paddingLeft: 49,
                     }}
                     onChangeText={input => this.setState({ input })}
                     value={this.state.input}
                     selectTextOnFocus={true}
                     keyboardType="numeric"
                   />
                   <Button
                     buttonStyle={{
                       backgroundColor: 'transparent',
                       width: 130,
                       borderColor: "#fff",
                       borderWidth: 1,
                       borderRadius: 5,
                       marginLeft: 13,
                       marginRight: 2
                     }}
                     textStyle={{ fontSize: 20, fontFamily: 'century-gothic' }}
                     title="Submit"
                     color='#4B5D63'
                     onPress={this.onPressButtonBabies.bind(this, 'babies')}
                   />
                 </View>
                </View>
                <View style={{ height: 110 }} />
              </KeyboardAvoidingView>

          </View>
        </ScrollView>
      </ImageBackground>

      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 40,
  },
  firstBarContainer: {
    marginBottom: 30,
    marginLeft: 15,
  },
  secondBarContainer: {
    marginLeft: 15,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  label: {
    color: '#4B5D63',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    fontFamily: 'century-gothic',

  },
  label1: {
    color: '#4B5D63',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'century-gothic',
    marginBottom: 20,
    marginLeft: 18,
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: 250
  },
  labelInModal: {
    alignSelf: 'center',
  },
  form: {
    marginBottom: 20,
    borderBottomColor: '#545454',
  },
});
