import {configureStore} from '@reduxjs/toolkit';
import userReducer from './UserdataSlice';
import userbookingReducer from './MybookingSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    userbookingdata: userbookingReducer,
  },
});
export default store;
