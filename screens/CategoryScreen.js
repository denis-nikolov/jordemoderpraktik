import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { ListItem } from 'react-native-elements';

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
  };

  state = {
    icon: 'md-arrow-dropright'
  }



  render() {
    return (
      <ScrollView>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
              />
            ))
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
