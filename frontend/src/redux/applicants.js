import { createSlice } from "@reduxjs/toolkit";

const applicantSlice =  createSlice({

    name: "applicants",
    initialState:{
        applicants: []
    },
    reducers:{
        //actions
        setApplicants:(state,action)=>{
            state.applicants = action.payload;
        }
    }
});

export const {setApplicants} = applicantSlice.actions;
export default applicantSlice.reducer;
