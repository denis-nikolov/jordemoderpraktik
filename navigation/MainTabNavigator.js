import React from 'react';
import { Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ExperienceScreen from '../screens/ExperienceScreen';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'ios-home'
      }
    />
  ),
  tabBarOptions: {
    inactiveTintColor: '#496595',
    activeTintColor: '#496595',
    borderTopWidth: 5,
    borderColor: 'red',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#ffb6c1',    
      },
  },


};

const CategoryStack = createStackNavigator({
  Category: CategoryScreen,
  Experience: ExperienceScreen,
});

CategoryStack.navigationOptions = {
  tabBarLabel: 'Category',
  tabBarOptions: {
    inactiveTintColor: '#496595',
    activeTintColor: '#496595',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#ffb6c1',
      },
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-list-box${focused ? '' : '-outline'}` : 'ios-list-box'}
    />
  ),
};

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
});

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendar',
  tabBarOptions: {
    inactiveTintColor: '#496595',
    activeTintColor: '#496595',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#ffb6c1',
      },
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-calendar${focused ? '' : '-outline'}` : 'ios-calendar'}
    />
  ),
};


const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarOptions: {
    inactiveTintColor: '#496595',
    activeTintColor: '#496595',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#ffb6c1',
      },
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-contact${focused ? '' : '-outline'}` : 'ios-contact'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  CategoryStack,
  CalendarStack,
  ProfileStack,
});
