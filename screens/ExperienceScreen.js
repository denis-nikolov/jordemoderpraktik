import React from 'react';
import { Icon, ScrollView, StyleSheet, FlatList,
        ImageBackground, Text, TouchableOpacity, View  } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { SearchBar, FormInput, FormLabel, ListItem, CheckBox, Button } from 'react-native-elements';
import Modal from 'react-native-modal';// 2.4.0
import TabBarIcon from '../components/TabBarIcon';
import { Ionicons } from '@expo/vector-icons';
import firebase from '@firebase/app';
import '@firebase/firestore';

const list = [
  {
    key: 'Svangreomsorg i jordemoderkonsultation',
  },
  {
    key: 'Svangreomsorg i jordemoderkonsultation',
  },
  {
    key: 'Svangreomsorg i jordemoderkonsultation',
  },
]

require('@firebase/firestore');
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export default class CategoryScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: 'Experience',
      headerStyle: {
        backgroundColor: '#add8e6',
        borderBottomWidth: 0,
      },
      headerTitleStyle: { color: '#4B5D63' },
      headerRight: (
        <TouchableOpacity style={styles.addExperienceIcon} onPress={params.handleAddExperience}>
          <TabBarIcon name='md-add'/>
        </TouchableOpacity>
      ),
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({
      handleAddExperience: this._addExperience
    });
  }

  componentWillReceiveProps() {
    var exps = this.props.navigation.getParam('experiences');
    this.setState({ experiences: exps });
    console.log(this.state.experiences);
    //this.setState({ experiences: this.props.navigation.state.experiences })
  }

  state = {
    checked: [],
    visibleModal: false,
    input: '',
    experiences: []
  }

  _addExperience = () => {
    this.setState({ visibleModal: true });
  }

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <View style={styles.form}>
           <Text style={styles.labelInModal}>Add new Experience</Text>
           <FormInput
            containerStyle={{borderBottomColor: '#7e7e7e'}}
            inputStyle={styles.input}
            onChangeText={input => this.setState({ input })}
            value={this.state.input}
            selectTextOnFocus={true}
            placeholder="Name"
          />
      </View>
      <Button //onPress={() => this.createNewExperience()}
              onPress={() => this.setState({ visibleModal: false })}
              title='Submit'
              buttonStyle={{
              backgroundColor: "#496595",
              width: 335,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5, }}/>
    </View>
  );

  createNewExperience = () => {
    items.push(this.state.input);
    this.setState({
      visibleModal: false,
      input: ''
     });
  }

  _keyExtractor = (item, index) => item.id;

  checkItem = item => {
    const { checked } = this.state;

    if (!checked.includes(item)) {
      this.setState({ checked: [...checked, item] });
    } else {
      this.setState({ checked: checked.filter(a => a !== item) });
    }
  }

  submitExperiences = () => {
    console.log(JSON.stringify(this.state.checked));
    firebase.firestore().collection('users').add({
      _id: '+4542469654',
      complete: this.state.checked,
    })
  }

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
          <Modal
            isVisible={this.state.visibleModal}
            //backdropColor={'red'}
            //backdropOpacity={1}
            animationIn={'zoomInDown'}
            animationOut={'zoomOutUp'}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
            onBackdropPress={() => this.setState({ visibleModal: false })}
          >
            {this._renderModalContent()}
          </Modal>
        </View>

        <ScrollView>
            <FlatList style={styles.container}
              data={this.state.experiences}
              extraData={this.state}
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
              keyExtractor={item => item}
            />
            <Button
                title='Submit'
                onPress={() => this.submitExperiences()}
                buttonStyle={{
                backgroundColor: '#496595',
                height: 45,
                borderColor: "transparent",
                marginBottom: 20,
                marginTop: 10,
                borderWidth: 0,
                borderRadius: 30, }}/>
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
  modalContent: {
    backgroundColor: '#d3b3b8',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  labelInModal: {
    fontSize: 18,
    color: '#3f3f3f',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
    borderBottomColor: '#545454',
    alignItems: 'center',
  },
  input: {
    color: '#545454',
    width: 300,
  },
  addExperienceIcon: {
    width: 20,
    marginRight: 15,
  },
  modalListItem: {
    width: 300,
    marginBottom: 20,
  },
  modalListItem1: {
    borderBottomWidth: 0,
  },
 });
