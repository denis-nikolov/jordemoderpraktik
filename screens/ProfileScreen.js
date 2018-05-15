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
} from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerStyle: { backgroundColor: '#add8e6' },
    headerTitleStyle: { color: '#4B5D63' },
  };

  render() {
     return (
     <Image source={require('../assets/images/background_gradient.jpg')}
     imageStyle={{resizeMode:'stretch'}}
     style={styles.backgroundImage}
     />

     );
   }
 }

 const styles = StyleSheet.create({
   backgroundImage: {
     flex: 1,
   },
 });
