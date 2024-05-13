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
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import styles from '../styles/Styles';
import DocumentPicker from 'react-native-document-picker';
import {useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';

const validationSchema = yup.object().shape({
  firstName: yup.string().required('FirstName is required'),
  lastName: yup.string().required('LastName is required'),
  userName: yup.string().required('UserName is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  contactNumber: yup.string().required('Contact number is required'),
  address: yup.string().required('Address is required'),
});

const EditProfile = () => {
  const [singleFile, setSingleFile] = useState({});
  const navigation = useNavigation();

  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      setSingleFile(res[0]);
      console.log('singleFile', singleFile);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled from single doc picker');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

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
          <Text style={[styles.h3, {marginLeft: 20}]}>Edit Profile</Text>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="dots-vertical" size={25} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        
        {/* profile picture */}
        {singleFile && (
            <View style={{alignItems:'center',marginTop:-40}}>
              <Image
                source={{uri: singleFile.uri}}
                style={{width: 130, height: 130,borderRadius:100}}
              />
              <TouchableOpacity onPress={selectOneFile}>
                <Text style={styles.text}>Edit Picture</Text>
              </TouchableOpacity>
            </View>
        
        )}

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
            <View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>First Name</Text>
                <TextInput
                  placeholder="Sonu"
                  placeholderTextColor="#000"
                  style={styles.inputfield}
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                />
                {touched.firstName && errors.firstName && (
                  <Text style={styles.errortext}>{errors.firstName}</Text>
                )}
              </View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>Last Name</Text>
                <TextInput
                  placeholder="Kumar"
                  placeholderTextColor="#000"
                  style={styles.inputfield}
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                />
                {touched.lastName && errors.lastName && (
                  <Text style={styles.errortext}>{errors.lastName}</Text>
                )}
              </View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>User Name</Text>
                <TextInput
                  placeholder="Sonu123"
                  placeholderTextColor="#000"
                  style={styles.inputfield}
                  value={values.userName}
                  onChangeText={handleChange('userName')}
                  onBlur={handleBlur('userName')}
                />
                {touched.userName && errors.userName && (
                  <Text style={styles.errortext}>{errors.userName}</Text>
                )}
              </View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>Email Address</Text>
                <TextInput
                  placeholder="sonu123@gmail.com"
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
                  placeholder="9504425494"
                  placeholderTextColor="#000"
                  style={styles.inputfield}
                  value={values.contactNumber}
                  onChangeText={handleChange('contactNumber')}
                  onBlur={handleBlur('contactNumber')}
                />
                {touched.contactNumber && errors.contactNumber && (
                  <Text style={styles.errortext}>{errors.contactNumber}</Text>
                )}
              </View>
              <View style={styles.textfield_wrapper}>
                <Text style={styles.text}>Address</Text>
                <TextInput
                  placeholder="Mattor,Sector-70,Mohali"
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
              <TouchableOpacity
                style={[styles.btn1, {marginTop: 20}]}
                onPress={handleSubmit}>
                <Text style={styles.btntext1}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};
export default EditProfile;
