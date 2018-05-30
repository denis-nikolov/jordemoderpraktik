import React from 'react';
import { Icon, ScrollView, StyleSheet, FlatList,
        ImageBackground, Text, TouchableOpacity, View, Alert, KeyboardAvoidingView  } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { SearchBar, FormInput, FormLabel, ListItem, CheckBox, Button } from 'react-native-elements';
import Modal from 'react-native-modal';// 2.4.0
import TabBarIcon from '../components/TabBarIcon';
import { Ionicons } from '@expo/vector-icons';
import firebase from '@firebase/app';
import '@firebase/firestore';


require('@firebase/firestore');
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export default class CategoryScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: 'Experiences',
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

  state = {
    checked: [],
    visibleModal: false,
    input: '',
    experiences: [],
    experiencesInitial: [],
    experiencesJson: null,
    userObject: {},
    searchText:'',
    isInfoModal: false,
  }

  componentWillMount() {
    this.props.navigation.setParams({
      handleAddExperience: this._addExperience
    });

    this.dbGetUserRecord();
  }

  componentWillReceiveProps() {
    var exps = this.props.navigation.getParam('experiences');
    let json = this.props.navigation.getParam('json');
    this.setState({ experiences: exps, experiencesInitial: exps, experiencesJson: json });
  }

  dbGetUserRecord() {
    var db = firebase.firestore();
    var expRef = db.collection('users').doc(global.uid);
    var getDoc = expRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        var obj = doc.data();
        this.setState({ userObject: obj })
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
  }

  dbCreateUserRecord() {
    var obj = this.state.userObject;
    var db = firebase.firestore();
    db.collection("users").doc(global.uid).set(obj);

    Alert.alert('Congratulations!', "Successfully submitted.", [{
      text: 'OK',
      onPress: () => console.log('asd')
    }]);
  }

  _addExperience = () => {
    this.setState({ isInfoModal: false, visibleModal: true });
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
            placeholder="Title"
          />
      </View>
      <Button onPress={() => this.createNewExperience()}
              title='Submit'
              buttonStyle={{
              backgroundColor: "#496595",
              width: 335,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5, }}
              textStyle={{ fontSize: 18, fontFamily: 'lato' }}/>
    </View>
  );

  _renderModalInfoExp = () => (
        <View style={styles.modalInfoExp}>
          <Text style={styles.labelInInfoModal}>How many times have you done this experience today?</Text>
          <View style={{ flex: 1, flexDirection: 'row', marginBottom: 30}}>
            <FormInput
             containerStyle={{
               borderBottomWidth: 0,
               height: 51,
               backgroundColor: '#fff',
               borderRadius: 5,
               flex: 1,
               justifyContent: 'center',
               alignItems: 'center',
               width: 100,
               marginLeft: 25,
             }}
             inputStyle={{
               width: 100,
               height: 51,
               justifyContent: 'center',
               fontSize: 26,
               fontFamily: 'century-gothic',
               alignSelf: 'center',
             }}
             onChangeText={input => this.setState({ input })}
             value={this.state.input}
             selectTextOnFocus={true}
             keyboardType="numeric"
           />
           <Button
             buttonStyle={{
               backgroundColor: '#496595',
               width: 125,
               borderColor: "#496595",
               borderWidth: 1,
               borderRadius: 5,
               marginRight: 10,
             }}
             textStyle={{ fontSize: 20, fontFamily: 'lato' }}
             title="Submit"
             color='#fff'
           />
         </View>
        </View>
  );

  createNewExperience = () => {
    var arr = this.state.experiences;
    arr.push(this.state.input);
    this.setState({
      visibleModal: false,
      input: '',
      experiences: arr
     });
  }

  checkItem = item => {
    console.log('CheckItem ' + item);
    const { checked } = this.state;

    if (!checked.includes(item)) {
      this.setState({ checked: [...checked, item] });
    } else {
      this.setState({ checked: checked.filter(a => a !== item) });
    }
  }

  submitExperiences = () => {
    var obj = this.state.userObject;
    var semester = global.semester;
    var expObj = this.createExperiencesObject();


    if (Object.keys(obj).length === 0 && obj.constructor === Object ) {
      obj[semester] = expObj;
      this.dbCreateUserRecord();
    } else {
      if (obj.hasOwnProperty(semester)) {
        this.appendExperiencesObject();
        this.dbCreateUserRecord();
      } else {
        obj[semester] = expObj;
        this.dbCreateUserRecord();
      }
    }
  }

  appendExperiencesObject() {
    var obj = this.state.userObject;
    var arr = this.state.checked;
    var semester = global.semester;
    var date = new Date();
    date = date.toISOString().split('T')[0];

    arr.forEach(function(entry) {
      if (obj[semester].hasOwnProperty(entry)) {
        var prevVal = JSON.stringify(obj[semester][entry]);
        prevVal = prevVal.replace(/"/g,"")
        var append = prevVal + ',' + date;
        obj[semester][entry] = append;
      } else {
        obj[semester][entry] = date;
      }
    });

    this.setState({ userObject: obj });
  }

  createExperiencesObject() {
    var obj = {};
    var arr = this.state.checked;
    const date = new Date();

    arr.forEach(function(entry) {
      obj[entry] = date.toISOString().split('T')[0];
    });

    return obj;
  }

  searchText = (text) => {
    let txt = text;
    let experienceList = this.state.experiencesInitial;

    var filteredList = experienceList.filter((item) => {
      if(item.match(txt))
        return item;
    })
    if (!text || text === '') {
      exps = this.state.experiencesInitial;
      this.setState({
        experiences: exps,
      })
      console.log(exps);
    } else if (!filteredList.length) {
     // set no data flag to true so as to render flatlist conditionally
       this.setState({
         experiences: {}
       })
    }
    else if (Array.isArray(filteredList)) {
      this.setState({
        experiences: filteredList
      })
    }
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
          platform='ios'
          onChangeText={(text) => { this.searchText(text) }}
          onClear={() => console.log('On clear text')}
          onCancel={() => console.log('On cancel text')}
          cancelIcon={true}
          cancelButtonTitle='Cancel'
          round
          placeholder='Search'
          />

        <View style={styles.container1}>
          <Modal
            style={{ justifyContent: 'flex-start', marginTop: 200 }}
            isVisible={this.state.visibleModal}
            animationIn={'zoomInDown'}
            animationOut={'zoomOutUp'}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
            onBackdropPress={() => this.setState({ visibleModal: false })}
          >
            {this.state.isInfoModal ? this._renderModalInfoExp() : this._renderModalContent()}
          </Modal>
        </View>

        <ScrollView>
            <FlatList style={styles.container}
              data={this.state.experiences}
              extraData={this.state}

              renderItem={({ item }) => (
                <CheckBox
                  title={item}
                  onPress={() => this.setState({ isInfoModal:true, visibleModal: true })}
                  onIconPress={() => this.checkItem(item)}
                  checked={this.state.checked.includes(item)}
                  checkedColor='#496595'
                  containerStyle={styles.checkbox}
                  textStyle={styles.textCheckbox}
                  size={26}
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
                marginBottom: 30,
                marginTop: 10,
                borderWidth: 0,
                borderRadius: 30, }}
                textStyle={{ fontSize: 18, fontFamily: 'lato' }}/>
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
    fontFamily: 'century-gothic',
    fontSize: 16,
  },
  searchBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
  },
  inputStyle: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: "#757272",
    color: '#383838',
    fontFamily: 'century-gothic',
  },
  modalContent: {
    backgroundColor: '#d3b3b8',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalInfoExp: {
    backgroundColor: '#d3b3b8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    height: 180,
  },
  labelInModal: {
    fontSize: 18,
    color: '#3f3f3f',
    fontWeight: 'bold',
    fontStyle: 'italic',
    justifyContent: 'center',
    marginBottom: 20,
    fontFamily: 'century-gothic',
  },
  labelInInfoModal: {
    fontSize: 18,
    color: '#3f3f3f',
    fontWeight: 'bold',
    flex: 1,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
    fontFamily: 'century-gothic',
  },
  form: {
    marginBottom: 20,
    borderBottomColor: '#545454',
    alignItems: 'center',
  },
  input: {
    color: '#545454',
    width: 300,
    fontFamily: 'century-gothic',
    fontSize: 16,
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
