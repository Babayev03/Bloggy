import {blogSlice} from './blog/BlogSlice';
import {configureStore} from '@reduxjs/toolkit';
import {themeReducer} from './theme/ThemeSlice';
import {saveSlice} from './save/SaveSlice';
import {loginReducer} from './login/LoginSlice';

export const store = configureStore({
  reducer: {
    blog: blogSlice.reducer,
    theme: themeReducer,
    save: saveSlice.reducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
