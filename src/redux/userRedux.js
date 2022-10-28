import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
   currentUser:false,
   isFetching:false,
   error:false
  },
  reducers: {
    loginStart:(state)=>{
      state.isFetching=true;
    },
    loginSucess:(state,action)=>{
      state.isFetching=false;
      state.currentUser=action.payload;
      state.error=false;
    },
    loginFailure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },
    logOut:(state)=>{
      state.currentUser=false;
      state.isFetching=false;
      state.error=false;
    },
  },
});

export const { loginStart ,loginSucess,loginFailure,logOut} = userSlice.actions;
export default userSlice.reducer;