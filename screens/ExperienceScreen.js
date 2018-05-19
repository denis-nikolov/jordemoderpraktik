import React from 'react';
import { ScrollView, StyleSheet, FlatList } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { ListItem, CheckBox } from 'react-native-elements';
import { ImageBackground } from 'react-native';
import Icon from 'react-native-ionicons'


const items = [
  'Experience 1',
  'Experience 2',
  'Experience 3',
  'Experience 4',
  'Experience 5',
  'Experience 6',
  'Experience 7',
  'Experience 8',
  'Experience 9',
  'Experience 10',
];

export default class CategoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Experiences',
    headerStyle: { backgroundColor: '#add8e6' },
    headerTitleStyle: { color: '#4B5D63' },
  };

state = {
  checked: [],
}

checkItem = item => {
    const { checked } = this.state;

    if (!checked.includes(item)) {
      this.setState({ checked: [...checked, item] });
    } else {
      this.setState({ checked: checked.filter(a => a !== item) });
    }
  };

  render() {
    return (

      <ImageBackground
        source={require('../assets/images/background_gradient.jpg')}
        style={{width: '100%', height: '103%'}}
      >

      <ScrollView>
          <FlatList style={styles.container}
            data={items}
            extraData={this.state}
            renderItem={({ item }) => (
              <CheckBox
                title={item}
                onPress={() => this.checkItem(item)}
                checked={this.state.checked.includes(item)}
                checkedColor='red'
                containerStyle={styles.checkbox}
                iconType='check-square'
              />
            )}
          />
      </ScrollView>

      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  checkbox: {
    backgroundColor: 'transparent',
    borderColor: '#A0A0A0',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    paddingTop: 50,
  }

});
