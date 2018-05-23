import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert, Button,
  ImageBackground,
  Picker,
  AsyncStorage
} from 'react-native';
import { MonoText } from '../components/StyledText';
import * as Progress from 'react-native-progress';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Modal from 'react-native-modal';
import { FormInput, FormLabel } from 'react-native-elements';

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
    }

  componentDidMount() {
    //this.setState({ visibleModal: true });
    //this.props.navigation.setParams({ semester: '2'});
    this.setSemester();
  }

  setSemester = async () => {
    await AsyncStorage.setItem('semester', '2');
  }

  state = {
    progress: 17,
    progressWithOnComplete: 45,
    hours: 50,
    babies: 15,
    visibleModal: false,
    semester: ''
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

    const barWidth = Dimensions.get('screen').width - 30;

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

                <ProgressBarAnimated
                  backgroundColor='#4B5D63'
                  borderColor='#85a1aa'
                  width={barWidth}
                  value={this.state.progress}
                  backgroundColorOnComplete='#148cF0' //"#6CC644"
                />
                <Text style={styles.label}>{this.state.hours}/300 hours</Text>
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonInner}>
                    <Button
                      title="Log progress"
                      onPress={this.onPressButtonHours.bind(this, 'hours')}
                    />
                  </View>
                </View>

                <ProgressBarAnimated
                  backgroundColor='#4B5D63'
                  borderColor='#85a1aa'
                  width={barWidth}
                  backgroundColorOnComplete='#148cF0'
                  value={this.state.progressWithOnComplete}
                  onComplete={() => {
                    Alert.alert('Hey!', 'You have delivered 40 babies!');
                  }}
                />
                <Text style={styles.label}>{this.state.babies}/40 delivered babies</Text>
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonInner}>
                    <Button
                      title="Log progress"
                      onPress={this.onPressButtonBabies.bind(this, 'babies')}
                    />
                  </View>
                </View>

          </View>
        </ScrollView>
      </ImageBackground>

      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 15,
  },
  buttonContainer: {
    marginTop: 10,
  },
  label: {
    color: '#4B5D63',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
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
  input: {
    color: '#545454',
    width: 300,
  },
});
