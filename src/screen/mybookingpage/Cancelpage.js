import {FlatList, View, Image, Text} from 'react-native';
import styles from '../../styles/Styles';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { useSelector } from 'react-redux';
import moment from 'moment';

const RenderBooking = ({item}) => {
  const bookingDate = moment(item.booking_date).format('DD MMM YYYY')
  return (
    <>
      {item.cleaning_status === 'Cancelled' && (
        <View style={{marginTop: 30}}>
        <View style={styles.booking_heading}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            {item.logo?<>
              <Image source={{uri: item.logo}} style={styles.profileImage} />
            </>:<>
            <Image source={require('../../assets/user-dummy.png')} style={styles.profileImage} />
            </>}
            <Text style={[styles.h6, {paddingLeft: 15}]}>
              {item.cleaner_name}
            </Text>
          </View>
          <Text style={{color: '#25435F', fontSize: 16, fontWeight: 'bold'}}>
            {item.booking_id}
          </Text>
        </View>
        <View style={styles.whitebox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="home" size={25} color={'#25435F'} />
            <Text style={[styles.h6, {color: '#000', paddingLeft: 10}]}>
              {item?.job_description ? item.job_description : 'Cleaner Services'}
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
                {bookingDate}
              </Text>
            </View>
            <Text
              style={[
                styles.h6,
                {
                  color:
                    item.cleaning_status === 'In Progress'
                      ? '#FFC003'
                      : item.cleaning_status === 'Completed'
                      ? '#008B06'
                      : '#FE0000',
                },
              ]}>
              {item.cleaning_status}
            </Text>
          </View>
        </View>
      </View>
      )}
    </>
  );
};
const Cancelpage = () => {
  const userbooking = useSelector(state => state.userbookingdata.userbooking.bookingdata);
  // filter cancel data from userbooking
  const cancelbooking = userbooking.filter(item => item.cleaning_status === 'Cancelled');
  return (
    <View style={[styles.container, {paddingBottom: 20}]}>
      <FlatList
        data={cancelbooking}
        renderItem={({ item }) => <RenderBooking item={item} />}
      />
    </View>
  );
};
export default Cancelpage;
