import {FlatList, View, Image, Text, ActivityIndicator, ScrollView,RefreshControl} from 'react-native';
import styles from '../../styles/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {getUserBooking} from '../../redux/MybookingSlice';
import moment from 'moment';

 const RenderBooking = ({item}) => {
  const bookingDate = moment(item.booking_date).format('DD MMM YYYY');
  return (
    <View style={{marginTop: 30}}>
      {/* {item.cleaning_status === "In Progress" && (
        <Text>{item.cleaning_status}</Text>
      )} */}
      <View style={styles.booking_heading}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          {item.logo ? (
            <>
              <Image source={{uri: item.logo}} style={styles.profileImage} />
            </>
          ) : (
            <>
              <Image
                source={require('../../assets/user-dummy.png')}
                style={styles.profileImage}
              />
            </>
          )}
          <Text style={[styles.h6, {paddingLeft: 15}]}>
            {item.cleaner_name}
          </Text>
        </View>
        <Text style={{color: '#25435F', fontSize: 16, fontWeight: 'bold'}}>
         $ {item.total_price_order}
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
  );
};

const AllBooking = () => {
  
  // Get user booking data from redux
  const userbooking = useSelector(state => state.userbookingdata.userbooking.bookingdata);
  console.log("userbooking",userbooking.cleaning_status);
  const loading = useSelector(state => state.userbookingdata.loading);
  const [refreshing, setRefreshing] =useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserBooking());
  }, [dispatch]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={[styles.container, {paddingBottom: 20}]}>
        {loading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 500,
            }}>
            <ActivityIndicator size="70" color="#25435F" />
          </View>
        ) : (
          <FlatList
            data={userbooking}
            renderItem={RenderBooking}
            // keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default AllBooking;
