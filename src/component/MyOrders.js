import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles/Styles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getcleanerorder} from '../redux/CleanerOrderSlice';

const MyOrders = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const ongoing_data = useSelector(
    state => state.cleanerorder.cleanerOrderdata.ongoing_data,
  );
  const completed = useSelector(
    state => state.cleanerorder.cleanerOrderdata.completed_data,
  );
  // console.log('ongoing_data', ongoing_data.length);

  //get cleaner order details
  useEffect(() => {
    dispatch(getcleanerorder());
  }, [dispatch]);

  return (
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
  );
};
export default MyOrders;
