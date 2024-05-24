import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import React, {useEffect} from 'react';
import styles from '../styles/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyOrders from '../component/MyOrders';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {getUserdata} from '../redux/UserdataSlice';


const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const [refreshing, setRefreshing] = React.useState(false);

  // Refresh Page
 const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getUserdata()).then(() => {
      setRefreshing(false);
    }).catch(() => {
      setRefreshing(false);
    });
  }, [dispatch]);


  useEffect(() => {
    dispatch(getUserdata());
  }, [dispatch]);
  
  // get token from AsyncStorage
  const [token, setToken] = React.useState(null);
  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      if (value !== null) {
        setToken(value);
        console.log('token', value);
      }
    });
  }, []);
  // if (!token) {
  //   navigation.navigate('Login');
  // }
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <ImageBackground
        source={require('../assets/circle1.png')}
        resizeMode="cover"
        style={{width: '85%', height: 200, marginTop: 1}}></ImageBackground>

      <View style={style.profile_wrapper}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: user.avatar}}
            style={{width: 80, height: 80, borderRadius: 100}}
          />
          <View style={{marginLeft: 10}}>
            <Text style={[styles.h4, {color: '#25435F',textTransform:'capitalize'}]}>{user.fname}</Text>
            {/* <Text style={{color: '#25435F'}}>{user.lname}</Text> */}
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Icon name="settings-suggest" size={35} color="#25435F" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.whitebox}>
          <Text style={styles.h2}>On-Demand house cleaning services</Text>
          <TouchableOpacity>
            <Text style={styles.text}>Find Helper</Text>
          </TouchableOpacity>
        </View>
      
        <View>
          <MyOrders />
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  profile_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 80,
    width: '100%',
    paddingHorizontal: 15,
  },
});

export default Home;
