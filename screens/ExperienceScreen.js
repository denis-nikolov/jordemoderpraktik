import React from 'react';
import { ScrollView, StyleSheet, FlatList, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { ListItem, CheckBox } from 'react-native-elements';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Modal from 'react-native-modal';// 2.4.0
import { FormInput, FormLabel } from 'react-native-elements';
import "@expo/vector-icons";
import TabBarIcon from '../components/TabBarIcon';
import { Ionicons } from '@expo/vector-icons';

const items = [
  'Identificere ressourcer og belastninger hos kvinden/familien, herunder kvinden/partnerens' ,
  'Inddrage viden om kvinden/familiens mål og behov i omsorgen' ,
  'Optage anamnese' ,
  'Inddrage partneren' ,
  'Observere og understøtte kvindens/partnerens begyndende tilknytning til barnet' ,
  'Inddrage viden om kvinden/familiens mål og behov i omsorgen' ,
  'Optage anamnese..' ,
  'Identificere ressourcer og belastninger hos kvinden/familien, herunder kvinden/partnerens handlekompetence, OAS og netværk',
  'Inddrage viden om kvinden/familiens mål og behov i omsorgen' ,
  'Identificere ressourcer og belastninger hos kvinden/familien, herunder kvinden/partnerens handlekompetence' ,
];


export default class CategoryScreen extends React.Component {

    static navigationOptions = {
      title: 'Experiences',
      headerStyle: {
        backgroundColor: '#add8e6',
        borderBottomWidth: 0,
       },
      headerTitleStyle: { color: '#545454' },
      // headerRight: (
      //
      // ),
    };

state = {
  checked: [],
  visibleModal: null,
  input: '',
}

componentDidMount() {
    this.setState({
      input: this.state.input,
    });
  }

_renderButton = (onPress) => (
  <TouchableOpacity onPress={onPress} style={styles.addExperienceIcon}>
    <TabBarIcon
      name='md-add'
    />
  </TouchableOpacity>
);

_renderModalContent = () => (
    <View style={styles.modalContent}>
      <View style={styles.form}>
           <Text style={styles.labelInModal}>Name:</Text>
           <FormInput
            inputStyle={styles.input}
            onChangeText={input => this.setState({ input })}
            value={this.state.input}
            selectTextOnFocus={true}
          />
      </View>
      <Button onPress={() => this.setState({ visibleModal: null })}
              title='Add Experience'
              style={styles.button}/>
    </View>
  );



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
        placeholder='Search'
        />

        <View style={styles.container1}>
          {this._renderButton(() => this.setState({ visibleModal: 4 }))}
          <Modal
          isVisible={this.state.visibleModal === 4}
          //backdropColor={'red'}
          //backdropOpacity={1}
          animationIn={'zoomInDown'}
          animationOut={'zoomOutUp'}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
        >
          {this._renderModalContent()}
        </Modal>
      </View>

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
    color: '#DCDCDC',
  },



    button: {
      backgroundColor: 'lightblue',
      padding: 12,
      margin: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },

    labelInModal: {
      marginLeft: 20,
    },

    form: {
      marginBottom: 10,
      borderBottomColor: '#545454',

    },
    input: {
      color: '#545454',
      width: 300,
    },

    addExperienceIcon: {
      width: 20,
      marginLeft: 10,
    },


});
