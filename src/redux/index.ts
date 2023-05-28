import {blogReducer} from './blog/BlogSlice';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});
