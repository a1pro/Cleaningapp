import React from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles/Styles';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

const CheckStatusPopup = ({modalVisible, setModalVisible}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={[styles.h6, {fontSize: 20}]}>Order Status</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={30} color="#000" />
              </TouchableOpacity>
            </View>
            {/* heading of profile */}
            <View style={{marginTop: 30}}>
              <Text style={styles.h6}>Cloth and bedsheet ironing</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Image source={require('../assets/gaviid.png')} />
                <Text style={[styles.text, {paddingLeft: 8, marginTop: 0}]}>
                  Shail Rathore
                </Text>
              </View>
            </View>
            {/* Details section */}
            <View style={{paddingTop:30}}>
              <Text style={styles.h6}>Details</Text>

              <View style={{flexDirection: 'row', alignItems: 'center',marginTop:10}}>
                <View style={[styles.whitebox,{alignItems:'center'}]}>
                  <View style={styles.icon_wrapper}>
                    <MaterialIcons name="access-time" size={30} color="#000" />
                  </View>
                  <View>
                    <Text style={styles.text}>2h 30 min</Text>
                    <Text style={styles.text_center}>Est time</Text>
                  </View>
                </View>
                <View style={[styles.whitebox, {marginLeft: 15,alignItems:'center'}]}>
                  <View style={styles.icon_wrapper}>
                    <MaterialIcons name="location-on" size={30} color="#000" />
                  </View>
                  <View>
                    <Text style={styles.text}>Chandigrah</Text>
                    <Text style={styles.text_center}>Location</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <View style={[styles.whitebox,{alignItems:'center'}]}>
                  <View style={styles.icon_wrapper}>
                    <MaterialIcons name="date-range" size={30} color="#000" />
                  </View>
                  <View>
                    <Text style={styles.text}>21 May2024</Text>
                    <Text style={styles.text_center}>Date</Text>
                  </View>
                </View>
                <View style={[styles.whitebox, {marginLeft: 15,alignItems:'center'}]}>
                  <View style={styles.icon_wrapper}>
                    <FontAwesome name="dollar" size={30} color="#000" />
                  </View>
                  <View>
                    <Text style={styles.text}>$ 80 per hour</Text>
                    <Text style={styles.text_center}>Price</Text>
                  </View>
                </View>
              </View>
              {/* Cancel and Confirm Order button */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={[
                      styles.btn2,
                      {
                        backgroundColor: '#F4CECE',
                        paddingLeft: 5,
                        paddingRight: 5,
                        marginTop: 0,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.btntext2,
                        {color: '#FE0D0D', fontSize: 16},
                      ]}>
                      Cancel order
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{flex: 1, marginLeft: 10}}>
                  <TouchableOpacity
                    style={[
                      styles.btn1,
                      {paddingLeft: 5, paddingRight: 5, marginBottom: 0},
                    ]}>
                    <Text style={[styles.btntext1, {fontSize: 16}]}>
                      Confirm order
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default CheckStatusPopup;