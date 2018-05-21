import React from 'react';
import { TouchableWithoutFeedback, Button, Text, View, ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { ListItem } from 'react-native-elements';
import { ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { StackNavigator } from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class CalendarScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      item: {
        height: 50,
        strTime: '',
        from: '',
        to: ''
      },
      dayPressed: '',
      hasDayPressed: false,
      isDateTimePickerVisible: false,
      dateTimePickerMode: 'datetime',
      isDatePicked: false,
      dateTimePickerTitle: 'Pick date & time'
    };
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: 'Calendar',
      headerStyle: { backgroundColor: '#add8e6' },
      headerTitleStyle: { color: '#4B5D63' },
      headerRight: (
        <Button onPress={params.handleCreateEvent} title="Add"/>
      ),
    };
  };

  componentWillMount() {
        this.props.navigation.setParams({
            handleCreateEvent: this.createEvent
        });
    }

  createEvent = () => {
    this._showDateTimePicker();
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {

    if (!this.state.isDatePicked) {
      this.state.item.strTime = this.timeToString(date);
      this.state.item.from = this.formatTime(date.toISOString().split('T')[1]);
      this.state.isDatePicked = true;
    } else {
      this.state.item.to = this.formatTime(date.toISOString().split('T')[1]);
      this.state.dateTimePickerMode = 'datetime';
      this.state.isDatePicked = false;
      this._addItem();
    }


    this._hideDateTimePicker();
    this._handleEndEvent();
    console.log(this.state.item);
  }

  _handleEndEvent = () => {
    if (this.state.isDatePicked) {
      this.setState({
        dateTimePickerMode: 'time'
      })
      this._showDateTimePicker();
    }
  }

  _addItem = () => {
    this.state.items[this.state.item.strTime].push({
      name: 'Shift:',
      from: 'Starts ' + this.state.item.from,
      to: 'Ends ' + this.state.item.to,
      height: this.state.item.height
    });
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
        style={{width: '100%', height: '103%'}}
      >

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

        <TouchableWithoutFeedback>
          <DateTimePicker
            date={this.state.hasDayPressed ? new Date(this.state.dayPressed) : new Date()}
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            mode={this.state.dateTimePickerMode}
            titleIOS={this.state.dateTimePickerTitle}
          />
        </TouchableWithoutFeedback>


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
 }
});
