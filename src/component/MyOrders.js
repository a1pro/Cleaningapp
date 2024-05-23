import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles/Styles';
import { useNavigation } from '@react-navigation/native';

const MyOrders = () => {
  const navigation = useNavigation();
  return (
    <View style={{marginTop:20}}>
      <TouchableOpacity onPress={()=>navigation.navigate('MyOrderPage')}>
      <Text style={styles.h6}>My Orders</Text>
      </TouchableOpacity>
      <View style={styles.orders_wrapper}>
        <View style={styles.ordersbox}>
          <Text style={styles.h3}>10</Text>
          <Text style={styles.h6}>Ongoing</Text>
        </View>
        <View style={styles.ordersbox}>
          <Text style={styles.h3}>36</Text>
          <Text style={styles.h6}>Complated</Text>
        </View>
      </View>
    </View>
  );
};
export default MyOrders;