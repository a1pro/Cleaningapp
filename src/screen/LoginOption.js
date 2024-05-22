import {View, Text, Image, SafeAreaView} from 'react-native';
import styles from '../styles/Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginOption = ({navigation}) => {
  
  // get token from AsyncStorage
  const [token, setToken] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      if (value !== null) {
        setToken(value);
        console.log('token', value);
      }
    });
  }, []);
  if (token) {
    navigation.navigate('Home');
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{marginTop: 1}}>
        <Image source={require('../assets/circle1.png')} />
      </View>
      <View style={styles.container}>
        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../assets/loginoption-img.png')}
            style={{height: '90%', width: '100%', resizeMode: 'contain'}}
          />
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={styles.btn1}
            onPress={() => navigation.navigate('Login',{role:1})}>
            <Text style={styles.btntext1}>Sign in as Services Provider</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('Login',{role:2})}>
            <Text style={styles.btntext2}>Sign in as Customer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default LoginOption;
