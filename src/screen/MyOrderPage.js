import {
    View,
    Text,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
  } from 'react-native';
  import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
  import styles from '../styles/Styles';
  import { useState} from 'react';
import OngoingOrder from './OngoingOrder';
import CompletedOrder from './CompletedOrder';

  
  const MyOrderPage = ({navigation}) => {
    const [selectTab, setSelectTab] = useState('Ongoing Order');

    // handleTab function
    const handleTab = (tab) => {
      setSelectTab(tab);
    };
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground
          source={require('../assets/circle1.png')}
          resizeMode="cover"
          style={{width: '85%', height: 200, marginTop: 1}}></ImageBackground>
        <View style={styles.header}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back-ios-new" size={25} color="#000" />
            </TouchableOpacity>
            <Text style={[styles.h3, {marginLeft: 20}]}>My Orders</Text>
          </View>
        </View>
        {/* //TAb Section */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: -40,
          }}>
          <TouchableOpacity
            onPress={() => handleTab('Ongoing Order')}
            style={[
              styles.activetabbtn,
              {
                backgroundColor:
                  selectTab === 'Ongoing Order' ? '#25435F' : '#F4F3F3',
              },
            ]}>
            <Text style={[styles.activetabttext,{color:selectTab==="Ongoing Order"?"#fff":'#898585'}]}>Ongoing Order</Text>
  
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTab('Completed Order')}
            style={[
              styles.activetabbtn,
              {
                backgroundColor:
                  selectTab === 'Completed Order' ? '#25435F' : '#F4F3F3',
              },
            ]}>
            <Text style={[styles.activetabttext,{color:selectTab==="Completed Order"?"#fff":'#898585'}]}>Completed Order</Text>
          </TouchableOpacity>
        </View>
        {selectTab ==="Ongoing Order" &&(
            <OngoingOrder/>
          )}
           {selectTab ==="Completed Order" &&(
            <CompletedOrder/>
          )}
      </ScrollView>
    );
  };
  export default MyOrderPage;
  