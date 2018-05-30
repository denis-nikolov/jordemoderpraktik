import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import firebase from '@firebase/app';
import '@firebase/firestore';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#add8e6',
      borderBottomWidth: 0,
     },
    headerTitleStyle: { color: '#545454' },
  };

  constructor(props) {
    super(props)

    this.state = {
      experiencesObject: {},
    }
  }

  componentWillMount() {
    this.dbGetUserRecord();
    this.createHtml();
  }

  dbGetUserRecord() {
    var db = firebase.firestore();
    var expRef = db.collection('users').doc('+4542469654');
    var getDoc = expRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        var obj = doc.data();
        let jsonString = JSON.stringify(obj[global.semester]);
        let json = JSON.parse(jsonString);
        var count = Object.keys(json);

        for (var i in count) {
          var key = Object.keys(json)[i]
          var datesToCount = JSON.stringify(json[key]);
          var datesCount = datesToCount.split(",").length;
          this.state.experiencesObject[key] = datesCount;
        }
        console.log(JSON.stringify(this.state.experiencesObject));
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
  }

  createHtml() {
    var document = require('../assets/sem02_pdf.html');
    var htmlElements = document.getElementsByTagName("p");
    console.log(htmlElements.length);
  }

  render() {
     return (
       <ImageBackground source={require('../assets/images/background_gradient.jpg')}
       style={{width: '100%', height: '103%'}}>


       </ImageBackground>

     );
   }
 }

 const styles = StyleSheet.create({

 });
