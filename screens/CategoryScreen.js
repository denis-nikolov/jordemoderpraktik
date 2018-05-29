import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { ListItem } from 'react-native-elements';
import { ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo';
import { StackNavigator } from 'react-navigation';
import firebase from '@firebase/app';
import '@firebase/firestore';

const config = {
  apiKey: "AIzaSyAZzqPWgp3AfMfnYOS9_TPofwfBT716Qrk",
  authDomain: "drink-and-drive.firebaseapp.com",
  databaseURL: "https://drink-and-drive.firebaseio.com",
  projectId: "drink-and-drive",
  storageBucket: "drink-and-drive.appspot.com",
  messagingSenderId: "943601859777"
};
firebase.initializeApp(config);
require('@firebase/firestore');
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

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

  state = {
    fsDocument: null,
    categories: [],
    experiences: []
  }

  componentWillMount() {
    if (this.state.fsDocument == null) {
      this.dbGetDocument();
    } else {
      var obj = this.state.fsDocument;
      var newStateArray = Object.keys(obj);
      this.setState({ fsDocument: obj, categories: newStateArray });
    }
  }

  dbGetDocument() {
    var semester = global.semester;
    var db = firebase.firestore();
    var expRef = db.collection('experiences').doc(semester);
    var getDoc = expRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        var obj = doc.data();
        let jsonString = JSON.stringify(obj);
        let json = JSON.parse(jsonString);
        var count = Object.keys(obj);
        var exps = [];
        for (var i in count) {
          var key = Object.keys(obj)[i]
          exps.push(obj[key]);
        }
        var newStateArray = Object.keys(obj);
        this.setState({ fsDocument: json, categories: newStateArray, experiences: exps });
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
  }

  goToExperienceScreen(item) {
    let exps = this.state.experiences[item];
    let jsonObject = this.state.fsDocument;
    this.props.navigation.navigate('Experience', { experiences: exps, json: jsonObject });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (

      <ImageBackground
        source={require('../assets/images/background_gradient.jpg')}
        style={{width: '100%', height: '103%'}}
      >

            <ScrollView style={{ marginTop: 20 }}>
                {
                  this.state.categories.map((item, i) => (
                    <ListItem
                      containerStyle={styles.listItems}
                      onPress={() => this.goToExperienceScreen(i)}
                      key={i}
                      title={item}
                      titleStyle={{ color: '#fff' }}
                      chevronColor='#fff'
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
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 0,
    marginBottom: 20,
    //backgroundColor:'#496595',
    width: 340,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#496595',
  }
});
