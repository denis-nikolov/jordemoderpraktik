import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { ListItem } from 'react-native-elements';
import { ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo';

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
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
