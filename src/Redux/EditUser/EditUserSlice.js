import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getEditUserById} from './MockData';

export const getEditUserAsync = createAsyncThunk(
  'getEditUserAsync',
  async (userId) => {
    var userInformation = getEditUserById(userId)
    return userInformation;
  }
);


export const editUserSlice = createSlice({
  name: "edituser",
  initialState: {
    userInformation: {
      id: 0,
      name: "",
      email: "",
      designation: "",
      unit: "",
      division: "",
      boundary: "",
      committeType: "",
      PAOtherInvolvementGroup: ""
    }
    },
  reducers: {
    
    editUserInformation: (state, action) => {
      state.userInformation = action.payload;
    }    

  },


  extraReducers: {
    [getEditUserAsync.fulfilled]: (state, action) => {
      state.userInformation = action.payload;
    },
    }
  
});

export const { editUserInformation } = editUserSlice.actions;
export default editUserSlice.reducer;
