import React from 'react';
import { ScrollView, StyleSheet, FlatList, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { ListItem, CheckBox } from 'react-native-elements';
import { ImageBackground } from 'react-native';
import { SearchBar } from 'react-native-elements';

const items = [
  'Identificere ressourcer og belastninger hos kvinden/familien, herunder kvinden/partnerens',
  'Inddrage viden om kvinden/familiens mål og behov i omsorgen',
  'Optage anamnese',
  'Inddrage partneren',
  'Observere og understøtte kvindens/partnerens begyndende tilknytning til barnet',
  'Inddrage viden om kvinden/familiens mål og behov i omsorgen',
  'Optage anamnese..',
  'Identificere ressourcer og belastninger hos kvinden/familien, herunder kvinden/partnerens handlekompetence, OAS og netværk',
  'Inddrage viden om kvinden/familiens mål og behov i omsorgen',
  'Identificere ressourcer og belastninger hos kvinden/familien, herunder kvinden/partnerens handlekompetence',
];


export default class CategoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Experiences',
    headerStyle: { backgroundColor: '#add8e6' },
    headerTitleStyle: { color: '#545454' },
  };

  _handleResults(items) {
  this.setState({ items });
}

state = {
  checked: [],
}

_keyExtractor = (item, index) => item.id;

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

      <SearchBar //ref={search => this.search = search}
        containerStyle={styles.searchBar}
        inputStyle={styles.inputStyle}
        //platform='ios'
        //onChangeText={}
        //onClear={}
        //onCancel={}
        cancelIcon={true}
        cancelButtonTitle='Cancel'
        round
        placeholder='Search' />

      <ScrollView>
          <FlatList style={styles.container}
            data={items}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => (
              <CheckBox
                title={item}
                onPress={() => this.checkItem(item)}
                checked={this.state.checked.includes(item)}
                checkedColor='#496595'
                containerStyle={styles.checkbox}
                textStyle={styles.textCheckbox}
                uncheckedColor='#383838'
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
    borderColor: '#496595',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    paddingBottom: 25,
    paddingBottom: 25,
  },

  textCheckbox: {
    color: '#383838',
  },

  searchBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
  },

  inputStyle: {
    backgroundColor: '#606060',
    //opacity: 0.,
    // borderRightWidth: 1,
    // borderLeftWidth: 1,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderColor: '#496595',
  }
});
