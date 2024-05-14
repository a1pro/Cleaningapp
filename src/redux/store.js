import {configureStore} from '@reduxjs/toolkit';
import userReducer from './UserdataSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default store;
