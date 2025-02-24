import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/state/slices/authSlices';

export const store = configureStore({
    reducer: {
        auth: authReducer, // persist 제거
    },
    devTools: process.env.NODE_ENV !== 'production',
});