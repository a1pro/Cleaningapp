import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  RefreshControl,
} from 'react-native';
import styles from '../styles/Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Base_url} from '../Apiurl';
import {useNavigation, useRoute} from '@react-navigation/native';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const route = useRoute();
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const roles = route?.params?.role;
  console.log('roles', roles);
  const [refreshing, setRefreshing] = React.useState(false);

  // Refresh Page
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  //Login Api
  const handleSubmit = async values => {
    try {
      console.log('values', values);
      const res = await axios({
        method: 'post',
        url: Base_url.login,
        data: {
          email: values.email,
          password: values.password,
          role: roles,
        },
      });
      if (res.data.success === true) {
        const key = res.data.data.token;
        const storeroles = res.data.data.role;
        // Store the token in AsyncStorage
        await AsyncStorage.setItem('token', key);

        // Store the role in AsyncStorage
        await AsyncStorage.setItem('role', String(storeroles));
        Alert.alert(res.data.message);
        navigation.navigate('Home');
      } else {
        Alert.alert('Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Invalid credentials');
      console.log(error);
    }
  };

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
    <>
      <View style={{marginTop: 1}}>
        <Image source={require('../assets/circle1.png')} />
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={values => handleSubmit(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.container}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 10,
                }}>
                <Text style={[styles.h3, {color: '#000', fontWeight: '600'}]}>
                  Sign In as {roles === 1 ? <>Cleaner</> : <>Customer</>}
                </Text>
                <View style={[styles.textfield_wrapper, {marginTop: 30}]}>
                  <TextInput
                    placeholder="Email"
                    style={styles.textfield}
                    placeholderTextColor="#000"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errortext}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.textfield_wrapper}>
                  <View
                    style={[
                      styles.textfield,
                      {flexDirection: 'row', alignItems: 'center'},
                    ]}>
                    <TextInput
                      placeholder="password"
                      secureTextEntry={!showPassword}
                      placeholderTextColor="#000"
                      style={[
                        styles.textfield,
                        {flex: 1, borderWidth: 0, paddingLeft: 0, marginTop: 0},
                      ]}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={{marginRight: 10}}>
                      <Icon
                        name={showPassword ? 'visibility' : 'visibility-off'}
                        size={30}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errortext}>{errors.password}</Text>
                  )}
                </View>
                <TouchableOpacity
                  style={[styles.btn1, {marginTop: 20}]}
                  onPress={handleSubmit}>
                  <Text style={styles.btntext1}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};
export default Login;
