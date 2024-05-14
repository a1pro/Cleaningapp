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
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import styles from '../styles/Styles';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

const validationSchema = yup.object().shape({
  required_cleaners: yup.string().required('Cleaners are required'),
  booking_type: yup.string().required('Booking type is required'),
  duration: yup.string().required('Duration is required'),
  start_time: yup.string().required('Start time is required'),
});

const BookingForm = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

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
          }}
          validationSchema={validationSchema}
          onSubmit={values => handleSubmit(values)}>
          {({
            selectedValue,
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
                  <Picker.Item label="Option 1" value="option1" />
                  <Picker.Item label="Option 2" value="option2" />
                  <Picker.Item label="Option 3" value="option3" />
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
                  <Picker.Item label="Option 1" value="option1" />
                  <Picker.Item label="Option 2" value="option2" />
                  <Picker.Item label="Option 3" value="option3" />
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
                    editable={false} // Making TextInput non-editable, only for display purpose
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
                  <Picker.Item label="Option 1" value="option1" />
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
                  <Picker.Item label="Option 1" value="option1" />
                  <Picker.Item label="Option 2" value="option2" />
                  <Picker.Item label="Option 3" value="option3" />
                </Picker>
                {touched.start_time && errors.start_time && (
                  <Text style={styles.errortext}>{errors.start_time}</Text>
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
