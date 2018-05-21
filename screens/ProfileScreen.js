import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#add8e6',
      borderBottomWidth: 0,
     },
    headerTitleStyle: { color: '#545454' },
  };

  render() {
     return (
       <ImageBackground source={require('../assets/images/background_gradient.jpg')}
       style={{width: '100%', height: '103%'}}>
       </ImageBackground>

     );
   }
 }

 const styles = StyleSheet.create({

 });
