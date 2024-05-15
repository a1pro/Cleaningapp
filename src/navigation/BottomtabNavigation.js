import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign';
import Home from '../screen/Home';
import Notification from '../screen/Notification';
import BookingForm from '../component/BookingForm';
import MyBooking from '../screen/MyBooking';

const Tab = createBottomTabNavigator();
const BottomtabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: '#f0f0f7',
        tabBarInactiveTintColor: '#25435F',
        tabBarStyle: {
          backgroundColor: '#f0f0f7',
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 10,
          paddingBottom: 10,
          height: 70,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="home" color="#25435F" size={30} />,
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="settings" color="#25435F" size={30} />,
        }}
      />
       <Tab.Screen
        name="Bookingform"
        component={BookingForm}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icons name="form" color="#25435F" size={30} />,
        }}
      />
       <Tab.Screen
        name="MyBooking"
        component={MyBooking}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="today-sharp" color="#25435F" size={30} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomtabNavigation;
