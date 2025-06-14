import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import addModalSlice from './slice/addModalSlice';
import blogSlice from './slice/blogSlice';
import deleteBlogSlice from './slice/deleteBlogSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        addModal: addModalSlice,
        blog: blogSlice,
        deleteBlog: deleteBlogSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 