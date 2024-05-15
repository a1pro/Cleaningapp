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
import {useState} from 'react';
import AllBooking from './mybookingpage/AllBooking';
import Completed from './mybookingpage/Completed';
import InProcess from './mybookingpage/InProcess';
import Cancelpage from './mybookingpage/Cancelpage';

const MyBooking = () => {
  const [selectTab, setSelectTab] = useState('All');

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
          onPress={() => handleTab('In Process')}
          style={[
            styles.activetabbtn,
            {
              backgroundColor:
                selectTab === 'In Process' ? '#25435F' : '#F4F3F3',
            },
          ]}>
          <Text style={[styles.activetabttext,{color:selectTab==="In Process"?"#fff":'#898585'}]}>In Process</Text>
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
      {selectTab ==="In Process" &&(  
        <InProcess/>
        )}
        {selectTab ==="Cancel" &&(
          <Cancelpage/>
          )}
    </ScrollView>
  );
};
export default MyBooking;
