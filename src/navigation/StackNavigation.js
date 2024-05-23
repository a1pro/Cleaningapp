import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import Login from '../screen/Login';
import BottomtabNavigation from './BottomtabNavigation';
import SplashScreen from '../screen/SplashScreen';
import LoginOption from '../screen/LoginOption';
import EditProfile from '../screen/EditProfile';
import MyOrderPage from '../screen/MyOrderPage';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginOption"
        component={LoginOption}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CarNumberPlate"
        component={DrawerNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Home" component={BottomtabNavigation} options={{headerShown:false}}/>
     
    </Stack.Navigator>
  );
};

export default StackNavigation;
