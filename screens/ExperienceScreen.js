import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { ListItem, CheckBox } from 'react-native-elements';
import { ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo';


const list = [
  {
    title: 'Experience 1',
  },
  {
    title: 'Experience 2',
  },
  {
    title: 'Experience 3',
  },
]

export default class CategoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Experiences',
    headerStyle: { backgroundColor: '#add8e6' },
    headerTitleStyle: { color: '#4B5D63' },
  };

state = {
  checked: false,
}

  render() {
    return (

      <ImageBackground
        source={require('../assets/images/background_gradient.jpg')}
        style={{width: '100%', height: '103%'}}
      >

            <ScrollView>
                {
                  list.map((item, i) => (
                    <ListItem
                      key={i}
                      title={item.title}
                      leftIcon={{ name: item.icon }}
                    />

                    // <CheckBox>
                    // title='Click Here'
                    // checked={this.state.checked}
                    // </CheckBox>

                  ))
                }
            </ScrollView>

      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({

});
