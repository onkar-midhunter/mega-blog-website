
import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import postSlice from './PostSlice'
 
const store = configureStore({
    reducer: {
        auth : authSlice,
        post : postSlice,
        //TODO: add more slices here for posts
    }
});


export default store;
