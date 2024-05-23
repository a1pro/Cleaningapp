import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import Notification from '../screen/Notification';
// import Home from '../screen/Home';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName='SplachScreen'>
      <Drawer.Screen
        name="CarNumberPlate"
        component={CarNumberPlate}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Icon
              name="dashboard"
              size={20}
            />
          ),
        }}
      />
      
      <Drawer.Screen
        name="Notification"
        component={Notification}
        options={{drawerIcon: () => <Icon name="notifications" size={20} />}}
      />
      {/* <Drawer.Screen
        name="Home"
        component={Home}
        options={{drawerIcon: () => <Icon name="home" size={20} />}}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
