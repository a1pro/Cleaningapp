import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7',
    marginLeft: 15,
    marginRight: 15,
  },
  h1: {
    fontSize: 40,
    fontWeight: '700',
  },
  h2: {
    fontSize: 28,
    fontWeight: '400',
    color: '#000',
    lineHeight: 35,
  },
  h3: {
    fontSize: 26,
    fontWeight: '400',
    color:'#000'
  },
  h4: {
    fontSize: 25,
    fontWeight: '500',
    lineHeight: 30,
  },
  h5: {
    fontSize: 20,
    fontWeight: '500',
  },
  h6:{
    fontSize: 18,
    fontWeight:'500',
    color:'#000',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: '#000',
    marginTop:10
  },
  btn: {
    fontWeight: '500',
    padding: 15,
    borderRadius: 23,
    backgroundColor: '#fff',
    width: 233,
    height: 62,
  },
  btn1: {
    fontWeight: '500',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 23,
    backgroundColor: '#25435F',
    marginBottom: 15,
  },
  btntext: {
    color: '#25435F',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  btntext1: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  btn2: {
    fontWeight: '500',
    padding: 15,
    borderRadius: 23,
    backgroundColor: '#DCDEE0',
    marginTop: 10,
  },
  btntext2: {
    color: '#25435F',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  textfield: {
    borderColor: '#25435F',
    borderRadius: 20,
    borderWidth: 1,
    paddingLeft: 20,
    fontSize: 18,
    marginTop: 10,
  },
  inputfield:{
    backgroundColor:'#F2F2F2',
    borderRadius:5,
    borderColor:'#898585',
    borderWidth:1,
    fontSize:18,
    paddingLeft:10,
  },
  textfield_wrapper: {
    width: '100%',
    marginBottom: 15,
  },
  errortext: {
    color: 'red',
  },
  whitebox: {
    backgroundColor: '#F4F3F3',
    flex: 1,
    borderRadius: 10,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  orders_wrapper:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:10
  },
  ordersbox:{
    flex:1,
    backgroundColor:'#F4F3F3',
    borderRadius:16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    padding:20,
    margin:7

  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    position: 'absolute',
    top: 80,
    width: '100%',
    paddingHorizontal: 15,

  },
  modalcontianer:{
    backgroundColor:'#fff',
    padding:20,
    borderRadius:10
  },
  activetabbtn:{
    // backgroundColor:'#25435F',
    borderRadius:20,
    padding:15
  },
  tabbtn:{
    // backgroundColor:'#F4F3F3',
    borderRadius:20,
    padding:15
  },
  activetabttext:{
    color:'#fff',
    fontSize:16,
    fontWeight:'500',
  },
  tabttext:{
    color:'#898585',
    fontSize:16,
    fontWeight:'500',
  },
  booking_heading:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 0,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding:20,
    width: '100%',
    // height:500, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon_wrapper:{
      width:50,
      height:50,
      borderRadius:100,
      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'center'
  },
  text_center:{
    textAlign:'center',
    paddingTop:8
  },
  profileImage:{
    width:70,
    height:70,
    borderRadius:100
  }
  
});
export default styles;
