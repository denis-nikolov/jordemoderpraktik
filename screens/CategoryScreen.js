import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { ListItem } from 'react-native-elements';
import { ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo';
import { StackNavigator } from 'react-navigation';

const list = [
  {
    title: 'Svangreomsorg i jordemoderkonsultation',
  },
  {
    title: 'Svangreomsorg i jordemoderkonsultation',
  },
  {
    title: 'Svangreomsorg i jordemoderkonsultation',
  },
]

export default class CategoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Categories',
    headerStyle: {
      backgroundColor: '#add8e6',
      //borderBottomColor: '#496595',
      borderBottomWidth: 0,
     },
    headerTitleStyle: { color: '#545454' },
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
                    <ListItem
                      containerStyle={styles.listItems}
                      onPress={() => this.goToExperienceScreen()}
                      key={i}
                      title={item.title}
                      chevronColor='#496595'
                      rightIcon={{name: 'play-arrow'}}
                    />
                  ))
                }
            </ScrollView>

      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({

  listItems: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    borderBottomColor:'#496595',
  }
});
