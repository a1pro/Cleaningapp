import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { Base_url } from "../Apiurl";

// Get Userbooking data API
const getUserBooking = createAsyncThunk("getUserBooking",async()=>{
    try {
        const token = await AsyncStorage.getItem('token');
        if(!token){
            Alert.alert("Invalid token")
        }
        const res = await axios.get(Base_url.userbooking,{
            headers:{
                "Content-Type":"application/json",
                'Authorization': `Bearer ${token}`,
            
            }
        });
       return res.data.data;
        
    } catch (error) {
        console.log(error);
    }
})

const MybookingSlice = createSlice({
    name:'userbooking',
    initialState:{
        userbooking:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getUserBooking.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getUserBooking.fulfilled,(state,action)=>{
            state.loading= false;
            state.userbooking= action.payload;
        })
        .addCase(getUserBooking.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload || action.error.message;
        })
    }
})
export default MybookingSlice.reducer;
export {getUserBooking};