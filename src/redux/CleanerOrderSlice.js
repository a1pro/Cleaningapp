import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { Base_url } from "../Apiurl";

// Get Cleaner Oder Data from api
const getcleanerorder = createAsyncThunk("getclenerorder",async()=>{
    try {
        const token = await AsyncStorage.getItem('token');
        if(!token){
            Alert.alert("No token found")
        }
        const res = await axios.get(Base_url.cleanerbooking,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json',
            }
        })
        return res.data.data;
        
    } catch (error) {
        console.log(error);
    }
})


const CleanerOrderSlice = createSlice({
    name: "CleanerOrder",
    initialState:{
        cleanerOrderdata:{},
        error:null,
        loading:false,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getcleanerorder.pending,(state)=>{
            state.loading = true;
            state.error= null;
            })
            .addCase(getcleanerorder.fulfilled,(state,action)=>{
                state.loading = false;
                state.cleanerOrderdata = action.payload;
                
            })
            .addCase(getcleanerorder.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })
    }
})
export default CleanerOrderSlice.reducer;
export {getcleanerorder};
