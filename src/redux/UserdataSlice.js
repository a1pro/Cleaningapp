import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Base_url } from "../Apiurl";

// Get UserProfile data API
const getUserdata = createAsyncThunk("userdata/getUserdata", async (_, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            return rejectWithValue("No token found");
        }
        const res = await axios.get(Base_url.get_user_detail, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        });
        return res.data.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

const UserdataSlice = createSlice({
    name: 'userdata',
    initialState: {
        user: {},
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserdata.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserdata.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserdata.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    }
});

export { getUserdata };
export default UserdataSlice.reducer;
