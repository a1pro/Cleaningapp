import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles/Styles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {getcleanerorder} from '../redux/CleanerOrderSlice';
import { getUserBooking } from '../redux/MybookingSlice';

const MyOrders = () => {
  const [roles, setRoles] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Cleaner Orders Data
  const ongoing_data = useSelector(state => state.cleanerorder.cleanerOrderdata?.ongoing_data);
  const completed = useSelector(state => state.cleanerorder.cleanerOrderdata?.completed_data);
  // Cleaner Orders end

  // User Orders Data
  const userOngoing_data = useSelector(state=>state.userbookingdata.userbooking.ongoing_count);
  const userCompleted_data = useSelector(state=>state.userbookingdata.userbooking.completed_count);



  //get cleaner order details
  useEffect(() => {
    dispatch(getcleanerorder());
  }, [dispatch]);

  //get User Order Details
  useEffect(()=>{
    dispatch(getUserBooking())
  },[dispatch]);

  
  //Cehck Role and show screen accroding role
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
  <>
    {roles === "1" ?<>
    {/* For Cleaners */}
    <View style={{marginTop: 20}}>
      {/* <TouchableOpacity onPress={()=>navigation.navigate('MyOrderPage')}> */}
      <Text style={styles.h6}>My Orders</Text>
      {/* </TouchableOpacity> */}
      <View style={styles.orders_wrapper}>
        <View style={styles.ordersbox}>
          <Text style={styles.h3}>{ongoing_data?.length}</Text>
          <Text style={styles.h6}>Ongoing</Text>
        </View>
        <View style={styles.ordersbox}>
          <Text style={styles.h3}>{completed?.length}</Text>
          <Text style={styles.h6}>Complated</Text>
        </View>
      </View>
    </View>
    </>:<>
    {/* For Users */}
    <View style={{marginTop: 20}}>
      {/* <TouchableOpacity onPress={()=>navigation.navigate('MyOrderPage')}> */}
      <Text style={styles.h6}>My Orders</Text>
      {/* </TouchableOpacity> */}
      <View style={styles.orders_wrapper}>
        <View style={styles.ordersbox}>
          <Text style={styles.h3}>{userOngoing_data}</Text>
          <Text style={styles.h6}>Ongoing</Text>
        </View>
        <View style={styles.ordersbox}>
          <Text style={styles.h3}>{userCompleted_data}</Text>
          <Text style={styles.h6}>Complated</Text>
        </View>
      </View>
    </View>
    </>}
  </>
  );
};
export default MyOrders;
