//로그인, 로그아웃 slices
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        accessToken: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.accessToken = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;