import {configureStore} from '@reduxjs/toolkit';
import userReducer from './UserdataSlice';
import userbookingReducer from './MybookingSlice';
import cleanerRuducer from './CleanerOrderSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    userbookingdata: userbookingReducer,
    cleanerorder:cleanerRuducer,
  },
});
export default store;
