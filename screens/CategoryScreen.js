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
    fsDocument: '',
    categories: [],
    experiences: []
  }

  componentWillMount() {
    this.dbGetDocument();
  }

  dbGetDocument() {
    var db = firebase.firestore();
    var expRef = db.collection('experiences').doc('sem02');
    var getDoc = expRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        var obj = doc.data();
        var newStateArray = Object.keys(obj);
        console.log(newStateArray);
        this.setState({ fsDocument: obj, categories: newStateArray });
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
  }

  getCategories() {

  }

  dbGetCategories() {
    var db = firebase.firestore();
    db.collection('experiences')
     .get()
     .then(snapshot => {
       snapshot.forEach(doc => {
         if (doc && doc.exists) {
           var obj = doc.data();
           var key = Object.keys(obj)[0];
           var exps = obj[key];
           var category = { title: Object.keys(obj)[0] };
           var newStateArray = this.state.categories.slice();
           newStateArray.push(category);
           this.setState({ experiences: exps, categories: newStateArray });
         }
        });
    });
  }

  goToExperienceScreen() {
    var exps = this.state.experiences;
    this.props.navigation.navigate('Experience', { experiences: exps });
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
                  this.state.categories.map((item, i) => (
                    <ListItem
                      containerStyle={styles.listItems}
                      onPress={() => this.goToExperienceScreen()}
                      key={i}
                      title={item}
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
    paddingLeft: 0,
    borderBottomColor:'#496595',
  }
});
