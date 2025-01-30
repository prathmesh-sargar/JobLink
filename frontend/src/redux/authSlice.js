import { createSlice } from "@reduxjs/toolkit";

const authSlice =  createSlice({

    name: "auth",
    initialState:{
        user: null,
        appliedJobs:[],
        loading: false
    },
    reducers:{
        //actions
        setUser:(state,action)=>{
            state.user = action.payload;
        },
        setAppliedJobs:(state,action)=>{
            state.appliedJobs = action.payload;
        },
        setLoading : (state, action) =>{
            state.loading = action.payload
        }
    }
});

export const {setUser,setAppliedJobs,setLoading} = authSlice.actions;
export default authSlice.reducer;