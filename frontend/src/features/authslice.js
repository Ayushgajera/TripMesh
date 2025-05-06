import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
}
const authslice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        userLoggedIn:(state,action)=>{
            state.user=action.payload.User;
            state.token=action.payload.token;
            console.log("User logged in:", state.user);
            state.isAuthenticated=true;
        },
        userLoggedOut:(state)=>{
            state.user=null;
            state.isAuthenticated=false;
        },
    },
})
export const{userLoggedIn,userLoggedOut}=authslice.actions;
export default authslice.reducer;