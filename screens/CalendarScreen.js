import React from 'react';
import { TouchableWithoutFeedback, Text, View, Alert,
          ScrollView, StyleSheet, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView  } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { ListItem, FormInput, FormLabel, Button } from 'react-native-elements';
import { LinearGradient } from 'expo';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { StackNavigator } from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import TabBarIcon from '../components/TabBarIcon';
import { Ionicons } from '@expo/vector-icons';
import firebase from '@firebase/app';
import '@firebase/firestore';

var list = [
  {
    title: 'Start date and time',
    icon: 'av-timer',
  },
  {
    title: 'End date and time',
    icon: 'av-timer',
  },
]

export default class CalendarScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      shifts: {},
      item: {
        height: 60,
        strTime: '',
        endTime: '',
        from: '',
        to: ''
      },
      dayPressed: '',
      hasDayPressed: false,
      isDateTimePickerVisible: false,
      dateTimePickerMode: 'datetime',
      isStartDatePicked: false,
      isEndDatePicked: false,
      dateTimePickerTitle: 'Pick date & time',
      visibleModal: false,
      input: '',
      modalItemCount: 0,
      userObject: {}
    };
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: 'Calendar',
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
    this.setState({
      input: this.state.input,
      visibleModal: false,
    });
    this.props.navigation.setParams({
      handleAddExperience: this._addExperience
    });

    this.dbGetItems();
  }

  _addExperience = () => {
    this.setState({ visibleModal: true });
  }

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <View style={styles.form}>
         <Text style={styles.labelInModal}>New Event</Text>
         <FormInput
          containerStyle={{borderBottomColor: '#7e7e7e'}}
          inputStyle={styles.input}
          onChangeText={input => this.setState({ input })}
          value={this.state.input}
          selectTextOnFocus={false}
          placeholder="Name"/>
      </View>
      <View style={styles.modalListItem}>
        {
          list.map((item, i) => (
            <ListItem
              onPress={() => this.setState({isDateTimePickerVisible: true, modalItemCount: i})}
              containerStyle={styles.modalListItem1}
              chevronColor='#496595'
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon, color: '#496595', }}
            />
          ))
        }
      </View>
      <View>
        <Button
          onPress={() => this._addItem()}
          title='Add to Calendar'
          buttonStyle={{
          backgroundColor: "#496595",
          width: 335,
          height: 45,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 5, }}/>

          <DateTimePicker
            date={this.state.hasDayPressed ? new Date(this.state.dayPressed) : new Date()}
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={() => this._hideDateTimePicker()}
            mode={'datetime'}
            titleIOS={'Pick date & time'}
          />
      </View>
    </View>
  );

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('Item count: ' + this.state.modalItemCount + " Date: " + date);

    if (this.state.modalItemCount == 0) {
      this.state.item.strTime = this.timeToString(date);
      this.state.item.from = this.formatTime(date.toISOString().split('T')[1]);
      list[0].title = this.state.item.from + " " + this.state.item.strTime;
    }
    if (this.state.modalItemCount == 1) {
      this.state.item.endTime = this.timeToString(date);
      this.state.item.to = this.formatTime(date.toISOString().split('T')[1]);
      list[1].title = this.state.item.to + " " + this.state.item.endTime;
    }

    console.log(this.state.item);
    this._hideDateTimePicker();
  }

  _handleEndEvent = () => {
    if (this.state.isDatePicked) {
      this.setState({
        dateTimePickerMode: 'time'
      })
      this._showDateTimePicker();
    }
  }

  resetFields() {
    this.setState({
      item: {
        height: 60,
        strTime: '',
        endTime: '',
        from: '',
        to: ''
      }
    });
    list[0].title = 'Start date and time';
    list[1].title = 'End date and time';
  }

  _addItem = () => {
    if (this.state.item.strTime != '') {
      if (this.state.item.strTime == this.state.item.endTime) {
        this.state.items[this.state.item.strTime].push({
          name: 'Event:' + this.state.input,
          from: 'Starts ' + this.state.item.from,
          to: 'Ends ' + this.state.item.to,
          height: this.state.item.height
        });

        if (!this.state.shifts[this.state.item.strTime])
          this.state.shifts[this.state.item.strTime] = [];

        this.state.shifts[this.state.item.strTime].push({
          name: 'Event:' + this.state.input,
          from: 'Starts ' + this.state.item.from,
          to: 'Ends ' + this.state.item.to,
          height: this.state.item.height
        });

      } else {
        this.state.items[this.state.item.strTime].push({
          name: 'Event:' + this.state.input,
          from: 'Starts ' + this.state.item.from,
          height: this.state.item.height
        });
        this.state.items[this.state.item.endTime].push({
          name: 'Event:' + this.state.input,
          to: 'Ends ' + this.state.item.to,
          height: this.state.item.height
        });

        if (!this.state.shifts[this.state.item.strTime])
          this.state.shifts[this.state.item.strTime] = [];
        this.state.shifts[this.state.item.strTime].push({
          name: 'Event:' + this.state.input,
          from: 'Starts ' + this.state.item.from,
          height: this.state.item.height
        });

        if (!this.state.shifts[this.state.item.endTime])
          this.state.shifts[this.state.item.endTime] = [];
        this.state.shifts[this.state.item.endTime].push({
          name: 'Event:' + this.state.input,
          to: 'Ends ' + this.state.item.to,
          height: this.state.item.height
        });
      }
      this.resetFields();
      this.handleAddItem();
    } else {
      this.setState({ visibleModal: false });
    }
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  handleAddItem() {
    var obj = this.state.userObject;
    var shiftsObj = this.state.shifts;

    if (Object.keys(obj).length === 0 && obj.constructor === Object ) {
      obj['shifts'] = shiftsObj;
      this.dbUpdateItems();
    } else {
      if (obj.hasOwnProperty('shifts')) {
        this.appendShiftsObject();
        this.dbUpdateItems();
      } else {
        obj['shifts'] = shiftsObj;
        this.dbUpdateItems();
      }
    }
  }

  appendShiftsObject() {
    var obj = this.state.userObject;
    var objToUpdate = {};
    objToUpdate['shifts'] = this.state.shifts;
    var updatedObj = Object.assign(obj,objToUpdate);

    this.setState({ userObject: updatedObj });
  }

  dbGetItems() {
    var db = firebase.firestore();
    var expRef = db.collection('users').doc(global.uid);
    var getDoc = expRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        var obj = doc.data();
        let jsonString = JSON.stringify(obj);
        let json = JSON.parse(jsonString);
        var count = Object.keys(obj);
        for (var i in count) {
          var key = Object.keys(obj)[i];

          if (key == 'shifts') {
            var fetchedShifts = json[key];
            var itemsObj = this.state.items;
            var nobj = Object.assign(itemsObj, fetchedShifts);
            console.log('DBGET: ' + JSON.stringify(obj));
            this.setState({ items: nobj, shifts: fetchedShifts});
          }
        }
        this.setState({ userObject: obj });
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
  }

  dbUpdateItems() {
    var obj = this.state.userObject;
    var db = firebase.firestore();
    db.collection("users").doc(global.uid).set(obj);

    Alert.alert('Congratulations!', "Successfully submitted.", [{
      text: 'OK',
      onPress: () => this._hideModal(),
    }]);
  }

  _hideModal() {
    this.setState({ visibleModal: false });
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}>
        <Text>{item.name}</Text>
        <Text>{item.from}</Text>
        <Text>{item.to}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>No shifts</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  formatTime(time) {
    var hour = time.substring(0,5);
    return hour;
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/background_gradient.jpg')}
        style={{width: '100%', height: '103%'}}>

        <View style={styles.container1}>
          <Modal
            style={{ justifyContent: 'flex-start', marginTop: 120, }}
            isVisible={this.state.visibleModal}
            animationIn={'zoomInDown'}
            animationOut={'zoomOutUp'}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
            onBackdropPress={() => this.setState({ visibleModal: false })}>
            {this._renderModalContent()}
          </Modal>
        </View>

        <Agenda
          style={{
            height: 350
          }}
          theme={{
            backgroundColor: 'transparent',
          }}
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={new Date()}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          onDayPress={(day)=>{ this.setState({dayPressed: day["dateString"], hasDayPressed: true}); }}
        />

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  calendar: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 350,
  },
  item: {
   backgroundColor: 'white',
   flex: 1,
   borderRadius: 5,
   padding: 10,
   marginRight: 10,
   marginTop: 17
 },
 emptyDate: {
   height: 15,
   flex:1,
   paddingTop: 30
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
