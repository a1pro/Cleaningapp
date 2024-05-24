import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles/Styles';
import {getcleanerorder} from '../redux/CleanerOrderSlice';
import {useDispatch, useSelector} from 'react-redux';
import CheckStatusPopup from '../component/CheckStatusPopup';

const CompletedOrder = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cleanerDataById, setCleanerDataById] = useState({});
  const [statusId, setStatusId] = useState('');
  const dispatch = useDispatch();
  const completed_data = useSelector(
    state => state.cleanerorder.cleanerOrderdata.completed_data,
  );

  //get cleaner order details
  useEffect(() => {
    dispatch(getcleanerorder());
  }, [dispatch]);

  const renderCompletedData = ({item}) => {
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
      <FlatList
        data={completed_data}
        renderItem={renderCompletedData}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default CompletedOrder;
