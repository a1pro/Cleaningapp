import {FlatList, Text, View} from 'react-native';
import styles from '../styles/Styles';

const MyOrders = () => {
  return (
    <View style={{marginTop:20}}>
      <Text style={styles.h6}>My Orders</Text>
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
