import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import styles from '../styles/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Popup = ({showModal, setShowModal}) => {
  const navigation = useNavigation();

  //Logout function
  const handleLogout = () => {
    setShowModal(false);
    AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };
  return (
    <Modal isVisible={showModal}>
      <View style={styles.modalcontianer}>
        <View style={{alignItems: 'center'}}>
          <Text style={[styles.h5, {color: '#000'}]}>
            Do you want to Logout?
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center',marginTop:20}}>
            <TouchableOpacity
              style={[styles.btn2,{marginTop:0}]}
              onPress={() => setShowModal(false)}>
              <Text style={styles.btntext2}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn1, {marginBottom: 0,marginLeft:15}]}
              onPress={handleLogout}>
              <Text style={styles.btntext1}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default Popup;
