import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { ListItem } from 'react-native-elements';
import { ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo';
import { StackNavigator } from 'react-navigation';

const list = [
  {
    title: 'Category 1',
  },
  {
    title: 'Category 2',
  },
  {
    title: 'Category 3',
  },
]

export default class CategoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Categories',
    headerStyle: { backgroundColor: '#add8e6' },
    headerTitleStyle: { color: '#4B5D63' },
  };

  goToExperienceScreen() {
        this.props.navigation.navigate('Experience');
    }

  render() {
    const { navigate } = this.props.navigation;

    return (

      <ImageBackground
        source={require('../assets/images/background_gradient.jpg')}
        style={{width: '100%', height: '103%'}}
      >

            <ScrollView>
                {
                  list.map((item, i) => (
                    <ListItem onPress={() => this.goToExperienceScreen()}
                      key={i}
                      title={item.title}
                      leftIcon={{ name: item.icon }}
                    />
                  ))
                }
            </ScrollView>

      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({

});
