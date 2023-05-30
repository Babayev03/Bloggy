import {blogSlice} from './blog/BlogSlice';
import {configureStore} from '@reduxjs/toolkit';
import {themeReducer} from './theme/ThemeSlice';

export const store = configureStore({
  reducer: {
    blog: blogSlice.reducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
