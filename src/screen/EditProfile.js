import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserdata} from '../redux/UserdataSlice';
import styles from '../styles/Styles';
import axios from 'axios';
import {Base_url} from '../Apiurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Popup from '../component/Popup';

const validationSchema = yup.object().shape({
  fname: yup.string().required('First name is required'),
  lname: yup.string().required('Last name is required'),
  company_name: yup.string().required('Company name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone_no: yup.string().required('Contact number is required'),
  address: yup.string().required('Address is required'),
  address2: yup.string().required('Address2 is required'),
  city: yup.string().required('City is required'),
  zip_code: yup.string().required('Zip code is required'),
});

const EditProfile = () => {
  const [singleFile, setSingleFile] = useState(null);
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getUserdata());
  }, [dispatch]);

  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSingleFile(res[0]);
      console.log('singleFile', res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled from single doc picker');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  //Edit profile data api
  const handleSubmit = async values => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const res = await axios({
        method: 'POST',
        url: Base_url.generateUserUpdate,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        data: {
          fname: values.fname,
          lname: values.lname,
          company_name: values.company_name,
          email: values.email,
          phone_no: values.phone_no,
          address1: values.address,
          address2: values.address2,
          city: values.city,
          zipcode: values.zip_code,
        },
      });

      if (res.data.success === true) {
        Alert.alert(res.data.message);
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', res.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while updating the profile.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ImageBackground
        source={require('../assets/circle1.png')}
        resizeMode="cover"
        style={{width: '85%', height: 200, marginTop: 1}}
      />
      <View style={styles.header}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color="#000" />
          </TouchableOpacity>
          <Text style={[styles.h3, {marginLeft: 20}]}>Edit Profile</Text>
        </View>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <MaterialCommunityIcons name="dots-vertical" size={25} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {/* Profile picture */}
        <View style={{alignItems: 'center', marginTop: -40}}>
          {singleFile ? (
            <Image
              source={{uri: singleFile.uri}}
              style={{width: 130, height: 130, borderRadius: 100}}
            />
          ) : (
            <Image
              source={{uri: user.avatar}}
              style={{width: 130, height: 130, borderRadius: 100}}
            />
          )}
          <TouchableOpacity onPress={selectOneFile}>
            <Text style={styles.text}>Edit Picture</Text>
          </TouchableOpacity>
        </View>

        <Formik
          enableReinitialize
          initialValues={{
            fname: user.fname || '',
            lname: user.lname || '',
            company_name: user.company_name || '',
            email: user.email || '',
            phone_no: user.phone_no || '',
            address: user.address1 || '',
            address2: user.address2 || '',
            city: user.city || '',
            zip_code: user.zipcode || '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>First Name</Text>
                <TextInput
                  placeholder="Enter first name"
                  placeholderTextColor="#000"
                  style={styles.inputfield}
                  value={values.fname}
                  onChangeText={handleChange('fname')}
                  onBlur={handleBlur('fname')}
                />
                {touched.fname && errors.fname && (
                  <Text style={styles.errortext}>{errors.fname}</Text>
                )}
              </View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>Last Name</Text>
                <TextInput
                  placeholder="Enter last name"
                  placeholderTextColor="#000"
                  style={styles.inputfield}
                  value={values.lname}
                  onChangeText={handleChange('lname')}
                  onBlur={handleBlur('lname')}
                />
                {touched.lname && errors.lname && (
                  <Text style={styles.errortext}>{errors.lname}</Text>
                )}
              </View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>Company Name</Text>
                <TextInput
                  placeholder="Enter company name"
                  placeholderTextColor="#000"
                  style={styles.inputfield}
                  value={values.company_name}
                  onChangeText={handleChange('company_name')}
                  onBlur={handleBlur('company_name')}
                />
                {touched.company_name && errors.company_name && (
                  <Text style={styles.errortext}>{errors.company_name}</Text>
                )}
              </View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>Email Address</Text>
                <TextInput
                  placeholder="example@gmail.com"
                  placeholderTextColor="#000"
                  style={styles.inputfield}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errortext}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>Contact Number</Text>
                <TextInput
                  placeholder="Enter contact number"
                  placeholderTextColor="#000"
                  style={styles.inputfield}
                  value={values.phone_no}
                  onChangeText={handleChange('phone_no')}
                  onBlur={handleBlur('phone_no')}
                />
                {touched.phone_no && errors.phone_no && (
                  <Text style={styles.errortext}>{errors.phone_no}</Text>
                )}
              </View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>Address1</Text>
                <TextInput
                  placeholder="Enter address"
                  placeholderTextColor="#000"
                  style={styles.inputfield}
                  value={values.address}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                />
                {touched.address && errors.address && (
                  <Text style={styles.errortext}>{errors.address}</Text>
                )}
              </View>
              {/* Address2 */}
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>Address2</Text>
                <TextInput
                  placeholder="Enter address2"
                  placeholderTextColor="#000"
                  style={styles.inputfield}
                  value={values.address2}
                  onChangeText={handleChange('address2')}
                  onBlur={handleBlur('address2')}
                />
                {touched.address2 && errors.address2 && (
                  <Text style={styles.errortext}>{errors.address2}</Text>
                )}
              </View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>City</Text>
                <TextInput
                  placeholder="Enter city"
                  placeholderTextColor="#000"
                  style={styles.inputfield}
                  value={values.city}
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                />
                {touched.city && errors.city && (
                  <Text style={styles.errortext}>{errors.city}</Text>
                )}
              </View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>Zip Code</Text>
                <TextInput
                  placeholder="Enter zipcode"
                  placeholderTextColor="#000"
                  style={styles.inputfield}
                  value={values.zip_code}
                  onChangeText={handleChange('zip_code')}
                  onBlur={handleBlur('zip_code')}
                />
                {touched.zip_code && errors.zip_code && (
                  <Text style={styles.errortext}>{errors.zip_code}</Text>
                )}
              </View>
              <TouchableOpacity
                style={[styles.btn1, {marginTop: 20}]}
                onPress={handleSubmit}>
                <Text style={styles.btntext1}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
      <Popup showModal={showModal} setShowModal={setShowModal} />
    </ScrollView>
  );
};

export default EditProfile;
