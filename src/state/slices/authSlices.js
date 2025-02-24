import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: localStorage.getItem('token') ? true : false, // 초기값 로컬스토리지에서 가져오기
    token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token); // 직접 저장
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('token'); // 로그아웃 시 삭제
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;