import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/Styles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getcleanerorder } from '../redux/CleanerOrderSlice';
import { getUserBooking } from '../redux/MybookingSlice';

const MyOrders = () => {
  const [roles, setRoles] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Cleaner Orders Data
  const ongoing_data = useSelector(state => state.cleanerorder.cleanerOrderdata?.ongoing_data);
  const completed = useSelector(state => state.cleanerorder.cleanerOrderdata?.completed_data);

  // User Orders Data
  const userOngoing_data = useSelector(state => state.userbookingdata.userbooking?.ongoing_count);
  const userCompleted_data = useSelector(state => state.userbookingdata.userbooking?.completed_count);

  // Get cleaner order details
  useEffect(() => {
    dispatch(getcleanerorder());
  }, [dispatch]);

  // Get user order details
  useEffect(() => {
    dispatch(getUserBooking());
  }, [dispatch]);

  // Check Role and show screen according to role
  useEffect(() => {
    const checkRoles = async () => {
      try {
        const storedRoles = await AsyncStorage.getItem('role');
        if (storedRoles !== null) {
          setRoles(storedRoles);
          console.log('roles124', storedRoles);
        } else {
          console.log('No roles found');
        }
      } catch (error) {
        console.error('Failed to load roles', error);
      }
    };
    checkRoles();
  }, []);

  if (roles === null) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      {roles === "1" ? (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.h6}>My Orders</Text>
          <View style={styles.orders_wrapper}>
            <View style={styles.ordersbox}>
            <TouchableOpacity onPress={()=> navigation.navigate('MyOrderPage')}>
              <Text style={styles.h3}>{ongoing_data?.length}</Text>
              <Text style={styles.h6}>Ongoing</Text>
            </TouchableOpacity>
            </View>
            {/* Completed order */}
            <View style={styles.ordersbox}>
            <TouchableOpacity onPress={()=> navigation.navigate('MyOrderPage')}>
              <Text style={styles.h3}>{completed?.length}</Text>
              <Text style={styles.h6}>Completed</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.h6}>My Orders</Text>
          <View style={styles.orders_wrapper}>
            <View style={styles.ordersbox}>
              <TouchableOpacity onPress={()=>navigation.navigate('MyBooking')}>
              <Text style={styles.h3}>{userOngoing_data}</Text>
              <Text style={styles.h6}>Ongoing</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ordersbox}>
              <TouchableOpacity onPress={()=>navigation.navigate('MyBooking')}>
              <Text style={styles.h3}>{userCompleted_data}</Text>
              <Text style={styles.h6}>Completed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default MyOrders;
