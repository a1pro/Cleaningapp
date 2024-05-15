import {FlatList, View, Image, Text} from 'react-native';
import styles from '../../styles/Styles';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {allbooking} from './Bookingdata';

const RenderBooking = ({item}) => {
  return (
    <>
      {item.status === 'Completed' && (
        <View style={{marginTop: 30}}>
          <View style={styles.booking_heading}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Image source={item.image} />
              <Text style={[styles.h6, {paddingLeft: 15}]}>{item.name}</Text>
            </View>
            <Text style={{color: '#25435F', fontSize: 16, fontWeight: 'bold'}}>
              {item.srs}
            </Text>
          </View>
          <View style={styles.whitebox}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="home" size={25} color={'#25435F'} />
              <Text style={[styles.h6, {color: '#000', paddingLeft: 10}]}>
                {item.service}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons name="date-range" size={25} color={'#25435F'} />
                <Text style={[styles.h6, {color: '#000', paddingLeft: 10}]}>
                  {item.date}
                </Text>
              </View>
              <Text
                style={[
                  styles.h6,
                  item.status === 'In Process'
                    ? {color: '#FFC003'}
                    : item.status === 'Completed'
                    ? {color: '#008B06'}
                    : {color: '#FE0000'},
                ]}>
                {item.status}
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};
const completed = () => {
  return (
    <View style={[styles.container, {paddingBottom: 20}]}>
      <FlatList
        data={allbooking}
        renderItem={RenderBooking}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};
export default completed;
