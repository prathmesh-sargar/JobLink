import { createSlice } from "@reduxjs/toolkit";

const jobSlice =  createSlice({

    name: "job",
    initialState:{
        job: [],
        adminjob:[],
        jobQuery: '',
        filterJob:[]
    },
    reducers:{
        //actions
        getJobs:(state,action)=>{
            state.job = action.payload;
        },
        getadminjob: (state,action)=>{
            state.adminjob = action.payload;
        },
        setJobQuery: (state,action)=>{
            state.jobQuery = action.payload;
        },setFilterjob:(state,action)=>{
            state.filterJob  = action.payload;
        }
    }
});

export const {getJobs,getadminjob,setJobQuery,setFilterjob} = jobSlice.actions;
export default jobSlice.reducer