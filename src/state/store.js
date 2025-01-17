import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/state/slices/authSlices';

const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});


export default store;