import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../styles/Styles';
import CheckStatusPopup from '../component/CheckStatusPopup';
import axios from 'axios';
import {Base_url} from '../Apiurl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OngoingOrder = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cleanerBooking, setCleanerBooking] = useState([]);
  const [statusId, setStatusId] = useState('');
  const [cleanerDataById, setCleanerDataById] = useState({});
  const [loading, setLoading] = useState(false);

  //handleCheckStatus Modal
  const handleCheckStatus = (id, item) => {
    setStatusId(id);
    setModalVisible(true);
    setCleanerDataById(item);
  };

  // Get CleanerBooking APi Data
  const getcleanerbooking = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Invalid token');
        return;
      }
      const res = await axios.get(Base_url.cleanerbooking, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200 && res.data.success === true) {
        setLoading(false);
        setCleanerBooking(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getcleanerbooking();
  }, []);

  const renderCleanerOrder = ({item}) => {
    return (
      <View style={[styles.container, {paddingBottom: 20}]}>
        <View style={[styles.whitebox, {padding: 10, marginTop: 20}]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', flex: 2, alignItems: 'center'}}>
              <Image source={{uri: item.logo}} style={styles.profileImage} />
              <View style={{paddingLeft: 10}}>
                <Text style={styles.h6}>{item.user_name}</Text>
              </View>
            </View>

            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => handleCheckStatus(item.id, item)}
                style={[
                  styles.btn1,
                  {
                    paddingLeft: 7,
                    paddingRight: 7,
                    paddingTop: 7,
                    paddingBottom: 7,
                  },
                ]}>
                <Text style={[styles.btntext1, {fontSize: 15}]}>
                  Check status
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.h5, {fontSize: 16, paddingTop: 10}]}>
            Service
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 2,
            }}>
            <View>
              <Text style={styles.h6}>{item.job_description}</Text>
              <Text
                style={[
                  styles.h5,
                  {fontSize: 16, color: '#898585', marginTop: 5},
                ]}>
                Est time: {item.duration}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.h6}>$ {item.total_price_order}</Text>
              <Text style={[styles.h5, {fontSize: 15, color: '#898585'}]}>
                Per hour
              </Text>
            </View>
          </View>
        </View>
        {/* Check Status Modal */}
        <CheckStatusPopup
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          statusId={statusId}
          cleanerDataById={cleanerDataById}
        />
      </View>
    );
  };

  return (
    <View>
      {loading ? (
        <View
          style={{justifyContent: 'center', alignItems: 'center', height: 500}}>
          <ActivityIndicator size="70" color="#25435F" />
        </View>
      ) : (
        <FlatList
          data={cleanerBooking}
          renderItem={renderCleanerOrder}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

export default OngoingOrder;
