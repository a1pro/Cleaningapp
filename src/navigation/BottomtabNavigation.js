import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from '../screen/Home';
import BookingForm from '../component/BookingForm';
import MyBooking from '../screen/MyBooking';
import MyOrderPage from '../cleaner/MyOrderPage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const BottomtabNavigation = () => {
  const [roles, setRoles] = useState(null);

  // Check Role and show screen according role
  useEffect(() => {
    const checkRoles = async () => {
      try {
        const storedRoles = await AsyncStorage.getItem('role');
        if (storedRoles !== null) {
          setRoles(storedRoles);
          console.log('roles124', roles);
        } else {
          console.log('No roles found');
        }
      } catch (error) {
        console.error('Failed to load roles', error);
      }
    };
    checkRoles();
  }, []);

  return (
    <Tab.Navigator
      tabBarHideOnKeyboard={true}
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#25435F',
        tabBarInactiveTintColor: '#898585',
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarStyle: {
          backgroundColor: '#f0f0f7',
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 10,
          paddingBottom: 10,
          height: 65,
        },
        tabBarIcon: ({focused, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Icon name={iconName} size={30} color={color} />;
          } else if (route.name === 'MyOrderPage') {
            iconName = 'shopping-bag';
            return <MaterialIcons name={iconName} size={30} color={color} />;
          } else if (route.name === 'Bookingform') {
            iconName = 'form';
            return <Icons name={iconName} size={30} color={color} />;
          } else if (route.name === 'MyBooking') {
            iconName = 'today-sharp';
            return <Icon name={iconName} size={30} color={color} />;
          }
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      {roles === '1' && (
        <Tab.Screen
          name="MyOrderPage"
          component={MyOrderPage}
          options={{
            headerShown: false,
          }}
        />
      )}
      {roles !== '1' && (
        <Tab.Screen
          name="Bookingform"
          component={BookingForm}
          options={{
            headerShown: false,
          }}
        />
      )}
      {roles !== '1' && (
        <Tab.Screen
          name="MyBooking"
          component={MyBooking}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default BottomtabNavigation;
