import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import styles from '../styles/Styles';
import {useEffect, useState} from 'react';
import AllBooking from './mybookingpage/AllBooking';
import Completed from './mybookingpage/Completed';
import InProcess from './mybookingpage/InProcess';
import Cancelpage from './mybookingpage/Cancelpage';
import { useDispatch, useSelector } from 'react-redux';
import { getUserdata } from '../redux/UserdataSlice';

const MyBooking = ({navigation}) => {
  const [selectTab, setSelectTab] = useState('All');
  // handleTab function
  const handleTab = (tab) => {
    setSelectTab(tab);
  };
  return (
    <>
      <ImageBackground
        source={require('../assets/circle1.png')}
        resizeMode="cover"
        style={{width: '85%', height: 200, marginTop: 1}}></ImageBackground>
      <View style={styles.header}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color="#000" />
          </TouchableOpacity>
          <Text style={[styles.h3, {marginLeft: 20}]}>My Bookings</Text>
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
          onPress={() => handleTab('All')}
          style={[
            styles.activetabbtn,
            {
              backgroundColor:
                selectTab === 'All' ? '#25435F' : '#F4F3F3',
            },
          ]}>
          <Text style={[styles.activetabttext,{color:selectTab==="All"?"#fff":'#898585'}]}>All</Text>

        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTab('Completed')}
          style={[
            styles.activetabbtn,
            {
              backgroundColor:
                selectTab === 'Completed' ? '#25435F' : '#F4F3F3',
            },
          ]}>
          <Text style={[styles.activetabttext,{color:selectTab==="Completed"?"#fff":'#898585'}]}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTab('In Progress')}
          style={[
            styles.activetabbtn,
            {
              backgroundColor:
                selectTab === 'In Progress' ? '#25435F' : '#F4F3F3',
            },
          ]}>
          <Text style={[styles.activetabttext,{color:selectTab==="In Progress"?"#fff":'#898585'}]}>In Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTab('Cancel')}
          style={[
            styles.activetabbtn,
            {backgroundColor: selectTab === 'Cancel' ? '#25435F' : '#F4F3F3'},
          ]}>
          <Text style={[styles.activetabttext,{color:selectTab==="Cancel"?"#fff":'#898585'}]}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {selectTab ==="All" &&(
        <AllBooking/>
      )}
      {selectTab ==="Completed" &&(
        <Completed/>
      )}
      {selectTab ==="In Progress" &&(  
        <InProcess/>
        )}
        {selectTab ==="Cancel" &&(
          <Cancelpage/>
          )}
    </>
  );
};
export default MyBooking;
