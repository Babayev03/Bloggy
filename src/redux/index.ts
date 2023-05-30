import {blogSlice} from './blog/BlogSlice';
import {configureStore} from '@reduxjs/toolkit';
import {themeReducer} from './theme/ThemeSlice';
import { saveSlice } from './save/SaveSlice';

export const store = configureStore({
  reducer: {
    blog: blogSlice.reducer,
    theme: themeReducer,
    save: saveSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
