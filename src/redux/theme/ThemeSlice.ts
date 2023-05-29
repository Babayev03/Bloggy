import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
    themeMode: 'light' | 'dark';
}

const initialState = {
  themeMode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;