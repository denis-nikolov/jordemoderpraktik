import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity,
  View, ImageBackground, FlatList } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/firestore';
import { FormInput, CheckBox, Button } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 18,
        fontFamily: 'lato',
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: '#f2efef',
        borderRadius: 4,
        backgroundColor: '#f2efef',
        color: '#496595', // color of the selected text
        width: 335,
    },
});


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

    this.inputRefs = {};

        this.state = {
            experiencesObject: {},
            checked: false,
            semester: undefined,
            inputName: '',
            inputPhone: global.uid,
            inputEmail: '',
            items: [
                {
                    label: 'Semester 2',
                    value: 'Semester 2',
                },
                {
                    label: 'Semester 4',
                    value: 'Semester 4',
                },
                {
                    label: 'Semester 6',
                    value: 'Semester 6',
                },
            ],
        };
  }

  checkItem = () => {
    if(! this.state.checked) {
      this.setState({ checked: true });
    }
    else {
      this.setState({checked: false});
    }
  }

  componentWillMount() {
    this.dbGetUserRecord();
    //this.createHtml();
  }

  componentDidMount() {
        setTimeout(() => {
            this.setState({
                semester: 'semester',
            });
        }, 1000);
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

          <Image
             style={{
               paddingVertical: 30,
               width: 150,
               height: 150,
               borderRadius: 75,
               alignSelf: 'center',
             }}
             resizeMode='cover'
             source={{
               uri: 'https://cdn4.iconfinder.com/data/icons/business-men-women-set-1/512/24-512.png'
             }}
           />

          <ScrollView style={styles.form}>
            <FormInput
             containerStyle={{borderBottomColor: '#7e7e7e'}}
             inputStyle={styles.input}
             onChangeText={input => this.setState({ input })}
             value={this.state.inputName}
             selectTextOnFocus={true}
             placeholder="Name"
             />
             <FormInput
              containerStyle={{borderBottomColor: '#7e7e7e'}}
              inputStyle={styles.input}
              onChangeText={input => this.setState({ input })}
              value={this.state.inputPhone}
              editable={false}
              selectTextOnFocus={true}
              placeholder="Phone number"
              />
              <FormInput
               containerStyle={{borderBottomColor: '#7e7e7e'}}
               inputStyle={styles.input}
               onChangeText={input => this.setState({ input })}
               value={this.state.inputEmail}
               selectTextOnFocus={true}
               placeholder="E-mail"
               />

          <View style={styles.container}>
            <View style={{ width: 335, marginLeft: 10 }}>
              <RNPickerSelect
                  style={{ ...pickerSelectStyles, placeholderColor: '#496595' }}
                  placeholder={{
                      label: 'Select semester...',
                      value: null,
                  }}
                  items={this.state.items}
                  value={this.state.semester}
                  onValueChange={(value) => {
                      this.setState({
                          semester: value,
                      });
                  }}
                  onUpArrow={() => {
                      this.inputRefs.name.focus();
                  }}
                  onDownArrow={() => {
                      this.inputRefs.picker.togglePicker();
                  }}
                  ref={(el) => {
                      this.inputRefs.picker = el;
                  }}
              />
            </View>

            <View style={styles.pdfContainer}>
              <CheckBox
                title='I confirm I finished the semester and I want to generate a PDF summarizing my experience log.'
                onPress={() => this.checkItem()}
                checked={this.state.checked}
                checkedColor='#496595'
                containerStyle={styles.checkbox}
                textStyle={styles.textCheckbox}
                size={26}
                uncheckedColor='#383838'
              />

              <Button
                  title='Download PDF'
                  //onPress={}
                  buttonStyle={{
                  backgroundColor: '#496595',
                  height: 45,
                  borderColor: "#496595",
                  marginBottom: 10,
                  marginTop: 10,
                  borderWidth: 1,
                  borderRadius: 5, }}
                  textStyle={{ fontSize: 18, fontFamily: 'lato', color: '#fff' }}/>
            </View>
          </View>
        </ScrollView>

       </ImageBackground>

     );
   }
 }

 const styles = StyleSheet.create({
   container: {
    paddingTop: 20,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    marginTop: 10,
  },
   input: {
     color: '#545454',
     width: 300,
     fontFamily: 'century-gothic',
     fontSize: 16,
   },
   form: {
     marginBottom: 20,
     borderBottomColor: '#545454',
   },
   checkbox: {
     backgroundColor: 'transparent',
     borderWidth: 0,
   },
   textCheckbox: {
     color: '#383838',
     fontFamily: 'century-gothic',
     fontSize: 16,
   },
   pdfContainer: {
     borderWidth: 0,
     borderRadius: 5,
     width: 335,
     marginTop: 20,
     marginLeft: 10,
     backgroundColor: '#f2efef',
   },
 });
