import React, { useState } from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles/Styles';
import CheckStatusPopup from '../component/CheckStatusPopup';

const OngoingOrder = () => {
  const [modalVisible,setModalVisible] = useState(false);
  return (
    <View style={[styles.container,{paddingBottom:20}]}>
      <View style={[styles.whitebox, {padding: 10,marginTop:20}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', flex: 2,alignItems:'center'}}>
            <Image source={require('../assets/gaviid.png')} />
            <View style={{paddingLeft:10}}>
              <Text style={styles.h6}>Sahil Rathore</Text>
            </View>
          </View>

          <View style={{flex: 1}}>
            <TouchableOpacity
            onPress={()=>setModalVisible(true)}
              style={[styles.btn1, {paddingLeft:7,paddingRight:7,paddingTop:7,paddingBottom:7}]}>
              <Text style={[styles.btntext1, {fontSize: 15}]}>
                Check status
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[styles.h5,{fontSize:16,paddingTop:10}]}>Service</Text>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:2}}>
            <View>
                <Text style={styles.h6}>Full house cleaning</Text>
                <Text style={[styles.h5,{fontSize:16,color:'#898585'}]}>Est time:2h 30 min</Text>
            </View>
            <View style={{alignItems:'center'}}>
                <Text style={styles.h6}>$ 80</Text>
                <Text style={[styles.h5,{fontSize:15,color:'#898585'}]}>Per hour</Text>
            </View>
        </View>
      </View>
      {/* Check Status Modal */}
      <CheckStatusPopup setModalVisible={setModalVisible} modalVisible={modalVisible}/>
    </View>
  );
};
export default OngoingOrder;
