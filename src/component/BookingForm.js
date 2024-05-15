import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  TextInput,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import styles from '../styles/Styles';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Base_url} from '../Apiurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

const validationSchema = yup.object().shape({
  required_cleaners: yup.string().required('Cleaners are required'),
  booking_type: yup.string().required('Booking type is required'),
  duration: yup.string().required('Duration is required'),
  start_time: yup.string().required('Start time is required'),
  address1: yup.string().required('Service address1 is required'),
  address2: yup.string().required('Service address2 is required'),
  servicecity: yup.string().required('Service city is required'),
  servicepostcode: yup.string().required('Service post code is required'),
  billingaddress1: yup.string().required('Billing address1 is required'),
  billingaddress2: yup.string().required('Billing address2 is required'),
  billingcity: yup.string().required('Billing city is required'),
  billingpostcode: yup.string().required('Billing Post code is required'),
});

const BookingForm = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [cleanersData, setCleanersData] = useState([]);
  const [duration, setDuration] = useState([]);
  const [bookingTypes, setBookingTypes] = useState([]);
  const [timeSlot, setTimeSlot] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [checked, setChecked] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const formatDate = date => {
    // Formatting the date as you prefer
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // getbooking form value
  const getbookingvalue = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    try {
      const res = await axios({
        method: 'GET',
        url: Base_url.getformvalues,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      if (res.data.success === true) {
        console.log(res.data.message);
        setCleanersData(res.data.data.cleaners);
        setDuration(res.data.data.duration);
        setBookingTypes(res.data.data.booking_types);
        setTimeSlot(res.data.data.time_slots);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getbookingvalue();
  }, []);

  // Send booking value
  const handleSubmit = async values => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    try {
      const res = await axios({
        method: 'POST',
        url: Base_url.booking_cleaner,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        data: {
          cleaners: values.required_cleaners,
          booking_types: values.booking_type,
          duration: values.duration,
          time_slots: values.start_time,
          booking_date: formatDate(date),
          service_address1:values.address1,
          service_address2:values.address2,
          service_city:values.servicecity,
          service_zipcode:values.servicepostcode,
          billing_address1:values.billingaddress1,
          billing_address2:values.billingaddress2,
          billing_city:values.billingcity,
          billing_zipcode:values.billingpostcode,
        },
      });
      if (res.data.status === true) {
        Alert.alert(res.data.message);
        console.log("bookingvalue",values);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
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
            required_cleaners: '',
            booking_type: '',
            duration: '',
            start_time: '',
            address1: '',
            address2: '',
            servicecity: '',
            servicepostcode: '',
            billingaddress1: '',
            billingaddress2: '',
            billingcity: '',
            billingpostcode: '',
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
                  selectedValue={values.required_cleaners}
                  style={styles.inputfield}
                  onValueChange={handleChange('required_cleaners')}
                  onBlur={handleBlur('required_cleaners')}>
                  <Picker.Item label="Select One" value="" />
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                  <Picker.Item label="5" value="5" />
                </Picker>
                {touched.required_cleaners && errors.required_cleaners && (
                  <Text style={styles.errortext}>
                    {errors.required_cleaners}
                  </Text>
                )}
              </View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>Booking Type</Text>
                <Picker
                  selectedValue={values.booking_type}
                  style={styles.inputfield}
                  onValueChange={handleChange('booking_type')}
                  onBlur={handleBlur('booking_type')}>
                  <Picker.Item label="Booking Type" value="" />
                  {bookingTypes &&
                    bookingTypes.map((data, index) => (
                      <Picker.Item
                        key={index}
                        label={data.name_type}
                        value={data.name_type}
                      />
                    ))}
                </Picker>
                {touched.booking_type && errors.booking_type && (
                  <Text style={styles.errortext}>{errors.booking_type}</Text>
                )}
              </View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>Booking Date</Text>
                <TouchableOpacity
                  onPress={showDatepicker}
                  style={[
                    styles.inputfield,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingRight: 15,
                    },
                  ]}>
                  <TextInput
                    placeholder="Select date"
                    placeholderTextColor="#000"
                    value={formatDate(date)}
                    style={{fontSize: 16, color: '#000'}}
                    editable={false}
                  />
                  <MaterialIcons name="date-range" size={30} />
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    minimumDate={new Date()}
                  />
                )}
              </View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>Select Duration</Text>
                <Picker
                  selectedValue={values.duration}
                  style={styles.inputfield}
                  onValueChange={handleChange('duration')}
                  onBlur={handleBlur('duration')}>
                  <Picker.Item label="Select Duration" value="" />
                  {duration &&
                    duration.map((data, index) => (
                      <Picker.Item
                        key={index}
                        label={data.hours}
                        value={data.hours}
                      />
                    ))}
                  <Picker.Item label="Option 2" value="option2" />
                  <Picker.Item label="Option 3" value="option3" />
                </Picker>
                {touched.duration && errors.duration && (
                  <Text style={styles.errortext}>{errors.duration}</Text>
                )}
              </View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>Select Start Time</Text>
                <Picker
                  selectedValue={values.start_time}
                  style={styles.inputfield}
                  onValueChange={handleChange('start_time')}
                  onBlur={handleBlur('start_time')}>
                  <Picker.Item label="Select Start Time" value="" />
                  {timeSlot &&
                    timeSlot.map((data, index) => (
                      <Picker.Item
                        key={index}
                        label={data.time_bw}
                        value={data.time_bw}
                      />
                    ))}
                </Picker>
                {touched.start_time && errors.start_time && (
                  <Text style={styles.errortext}>{errors.start_time}</Text>
                )}
              </View>
              {/* Cleaners Details */}
              <TouchableOpacity
                onPress={() => setShowAddress(!showAddress)}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#000',
                  paddingBottom: 10,
                }}>
                <Text style={styles.h6}>Cleaners Details</Text>
              </TouchableOpacity>
              <View
                style={showAddress ? {display: 'block'} : {display: 'none'}}>
                {/* Service Address */}
                <View style={{paddingTop: 20}}>
                  <View style={{marginBottom: 10}}>
                    <Text style={[styles.h5, {color: '#000'}]}>
                      Service Address
                    </Text>
                  </View>
                  <View style={styles.textfield_wrapper}>
                    <Text style={styles.text}>Service Address1</Text>
                    <TextInput
                      placeholder="address1"
                      placeholderTextColor="#000"
                      style={styles.inputfield}
                      value={values.address1}
                      onChangeText={handleChange('address1')}
                      onBlur={handleBlur('address1')}
                    />
                    {touched.address1 && errors.address1 && (
                      <Text style={styles.errortext}>{errors.address1}</Text>
                    )}
                  </View>
                  <View style={styles.textfield_wrapper}>
                    <Text style={styles.text}>Service Address2</Text>
                    <TextInput
                      placeholder="address2"
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
                    <Text style={styles.text}>City/Town</Text>
                    <TextInput
                      placeholder="city"
                      placeholderTextColor="#000"
                      style={styles.inputfield}
                      value={values.servicecity}
                      onChangeText={handleChange('servicecity')}
                      onBlur={handleBlur('servicecity')}
                    />
                    {touched.servicecity && errors.servicecity && (
                      <Text style={styles.errortext}>{errors.servicecity}</Text>
                    )}
                  </View>
                  <View style={styles.textfield_wrapper}>
                    <Text style={styles.text}>Post Code</Text>
                    <TextInput
                      placeholder="postcode"
                      placeholderTextColor="#000"
                      style={styles.inputfield}
                      value={values.servicepostcode}
                      onChangeText={handleChange('servicepostcode')}
                      onBlur={handleBlur('servicepostcode')}
                    />
                    {touched.servicepostcode && errors.servicepostcode && (
                      <Text style={styles.errortext}>
                        {errors.servicepostcode}
                      </Text>
                    )}
                  </View>
                </View>
                {/* Billing Address */}
                <View style={{paddingTop: 20}}>
                  <View
                    style={{
                      marginBottom: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <CheckBox
                      value={checked}
                      onValueChange={newValue => setChecked(newValue)}
                    />
                    <Text style={[styles.h5, {color: '#000', marginHorizontal:20}]}>
                      Billing Address Same
                    </Text>
                  </View>
                  <View style={styles.textfield_wrapper}>
                    <Text style={styles.text}>Billing Address1</Text>
                    <TextInput
                      placeholder="address1"
                      placeholderTextColor="#000"
                      style={styles.inputfield}
                      value={values.billingaddress1}
                      onChangeText={handleChange('billingaddress1')}
                      onBlur={handleBlur('billingaddress1')}
                    />
                    {touched.billingaddress1 && errors.billingaddress1 && (
                      <Text style={styles.errortext}>
                        {errors.billingaddress1}
                      </Text>
                    )}
                  </View>
                  <View style={styles.textfield_wrapper}>
                    <Text style={styles.text}>Billing Address2</Text>
                    <TextInput
                      placeholder="address2"
                      placeholderTextColor="#000"
                      style={styles.inputfield}
                      value={values.billingaddress2}
                      onChangeText={handleChange('billingaddress2')}
                      onBlur={handleBlur('billingaddress2')}
                    />
                    {touched.billingaddress2 && errors.billingaddress2 && (
                      <Text style={styles.errortext}>
                        {errors.billingaddress2}
                      </Text>
                    )}
                  </View>
                  <View style={styles.textfield_wrapper}>
                    <Text style={styles.text}>City/Town</Text>
                    <TextInput
                      placeholder="city"
                      placeholderTextColor="#000"
                      style={styles.inputfield}
                      value={values.billingcity}
                      onChangeText={handleChange('billingcity')}
                      onBlur={handleBlur('billingcity')}
                    />
                    {touched.billingcity && errors.billingcity && (
                      <Text style={styles.errortext}>{errors.billingcity}</Text>
                    )}
                  </View>
                  <View style={styles.textfield_wrapper}>
                    <Text style={styles.text}>Post Code</Text>
                    <TextInput
                      placeholder="postcode"
                      placeholderTextColor="#000"
                      style={styles.inputfield}
                      value={values.billingpostcode}
                      onChangeText={handleChange('billingpostcode')}
                      onBlur={handleBlur('billingpostcode')}
                    />
                    {touched.billingpostcode && errors.billingpostcode && (
                      <Text style={styles.errortext}>
                        {errors.billingpostcode}
                      </Text>
                    )}
                  </View>
                </View>
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
