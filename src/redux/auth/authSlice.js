import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem("HMSMern")) || null,
    isLoading: false,
    error: null,
    successMessage: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest(state) {            
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.isLoading = false;
            state.user = action.payload;
            localStorage.setItem("HMSMern", JSON.stringify(state.user));
        },
        loginFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        forgetPasswordRequest(state){
            state.isLoading = true;
            state.error = null;
            state.successMessage = null; 
        },
        forgetPasswordSuccess(state, action){
            state.isLoading = false;
            state.successMessage = action.payload.message; 
        },
        forgetPasswordFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload.message;
        },
        logout(state) {
            state.user = null;
            state.tokens = null;
            localStorage.removeItem("HMSMern");
        },
    },
});

// export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export const { loginRequest, loginSuccess, loginFailure, logout, forgetPasswordRequest, forgetPasswordSuccess, forgetPasswordFailure } = authSlice.actions;

export default authSlice.reducer;
