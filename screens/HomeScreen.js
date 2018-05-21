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
} from 'react-native';
import { MonoText } from '../components/StyledText';
import * as Progress from 'react-native-progress';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
    headerStyle: {
      backgroundColor: '#add8e6',
      borderBottomWidth: 0, 
    },
    headerTitleStyle: { color: '#545454' },
  };

  state = {
    progress: 17,
    progressWithOnComplete: 45,
    hours: 50,
    babies: 15,
  }

    onPressButtonHours = () => {
        if (this.state.hours <= 294) {
          this.setState({
              hours: this.state.hours + 6,
              progress: this.state.progress + 2,
          });
        }

        else {
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

  render() {

    const barWidth = Dimensions.get('screen').width - 30;

      return (
      <ImageBackground source={require('../assets/images/background_gradient.jpg')}
      style={{width: '100%', height: '103%'}}>
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

  });
