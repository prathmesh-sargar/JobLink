import { createSlice } from "@reduxjs/toolkit";


const compnaySlice =  createSlice({

    name: "companies",
    initialState:{
        companies: [],
        singleCompany:null
    },
    reducers:{
        //actions
        getCompanies:(state,action)=>{
            state.companies = action.payload;
        },
        getSingleCompany: (state,action)=>{
            state.singleCompany = action.payload
        }
    }
});

export const {getCompanies, getSingleCompany} = compnaySlice.actions;
export default compnaySlice.reducer