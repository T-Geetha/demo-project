import { configureStore } from '@reduxjs/toolkit';
import edituserdataReducer from "./EditUser/EditUserSlice";
export default configureStore({
    reducer: {
        edituserdata: edituserdataReducer
    }
})