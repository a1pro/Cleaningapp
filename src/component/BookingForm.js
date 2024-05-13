import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  TextInput,
  ImageBackground,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import styles from '../styles/Styles';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import { useState } from 'react';

const validationSchema = yup.object().shape({
  firstName: yup.string().required('FirstName is required'),
  lastName: yup.string().required('LastName is required'),
  userName: yup.string().required('UserName is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  contactNumber: yup.string().required('Contact number is required'),
  address: yup.string().required('Address is required'),
});

const BookingForm = () => {
  const navigation = useNavigation();
  const [selectedValue,setSelectedValue] = useState()

  const handleSubmit = async values => {
    console.log('values', values);
    navigation.navigate('Home');
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
          <Text style={[styles.h3, {marginLeft: 20}]}>Booking Form</Text>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="dots-vertical" size={25} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={{marginTop: -40, alignItems: 'center'}}>
          <Image
            source={require('../assets/booking-banner.png')}
            style={{width: '100%'}}
          />
        </View>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            contactNumber: '',
            address: '',
          }}
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
            <View style={{marginTop: 20}}>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>Required Cleaners</Text>
                <Picker
                  selectedValue={selectedValue}
                  style={styles.inputfield}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }>
                  <Picker.Item label="Select One" value="" />
                  <Picker.Item label="Option 1" value="option1" />
                  <Picker.Item label="Option 2" value="option2" />
                  <Picker.Item label="Option 3" value="option3" />
                </Picker>
                {touched.firstName && errors.firstName && (
                  <Text style={styles.errortext}>{errors.firstName}</Text>
                )}
              </View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>Booking Type</Text>
                <Picker
                  selectedValue={selectedValue}
                  style={styles.inputfield}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }>
                  <Picker.Item label="Booking Type" value="" />
                  <Picker.Item label="Option 1" value="option1" />
                  <Picker.Item label="Option 2" value="option2" />
                  <Picker.Item label="Option 3" value="option3" />
                </Picker>
                {touched.lastName && errors.lastName && (
                  <Text style={styles.errortext}>{errors.lastName}</Text>
                )}
              </View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>Select Duration</Text>
                <Picker
                  selectedValue={selectedValue}
                  style={styles.inputfield}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }>
                  <Picker.Item label="Select Duration" value="" />
                  <Picker.Item label="Option 1" value="option1" />
                  <Picker.Item label="Option 2" value="option2" />
                  <Picker.Item label="Option 3" value="option3" />
                </Picker>
                {touched.userName && errors.userName && (
                  <Text style={styles.errortext}>{errors.userName}</Text>
                )}
              </View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>Select Start Time</Text>
                <Picker
                  selectedValue={selectedValue}
                  style={styles.inputfield}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }>
                  <Picker.Item label="Select Start Time" value="" />
                  <Picker.Item label="Option 1" value="option1" />
                  <Picker.Item label="Option 2" value="option2" />
                  <Picker.Item label="Option 3" value="option3" />
                </Picker>
                {touched.email && errors.email && (
                  <Text style={styles.errortext}>{errors.email}</Text>
                )}
              </View>
              <TouchableOpacity
                style={[styles.btn1, {marginTop: 20}]}
                onPress={handleSubmit}>
                <Text style={styles.btntext1}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};
export default BookingForm;
