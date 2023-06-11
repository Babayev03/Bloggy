import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface LoginState {
  loggedIn: boolean | null | string;
  token: string ;
}

const initialState: LoginState = {
  loggedIn: false,
  token: 'null',
};

export const setLoggedIn = createAsyncThunk(
  'login/setLoggedIn',
  async ({loggedIn, token}: {loggedIn: string; token: string}) => {
    try {
      await AsyncStorage.setItem('loggedIn', loggedIn.toString());
      await AsyncStorage.setItem('token', token.toString());
      return {loggedIn, token};
    } catch (error) {
      console.log(error);
      return {loggedIn: false, token: 'null'};
    }
  },
);

export const getLoggedIn = createAsyncThunk('login/getLoggedIn', async () => {
  try {
    const loggedIn = await AsyncStorage.getItem('loggedIn');
    const token = await AsyncStorage.getItem('token');
    if (loggedIn === null || token === null) {
      return {loggedIn: false, token: 'null'};
    }
    return {loggedIn, token};
  } catch (error) {
    console.log(error);
    return {loggedIn: false, token: 'null'};
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    toggleLogin: state => {
      state.loggedIn = !state.loggedIn;
    },
  },
  extraReducers: builder => {
    builder.addCase(getLoggedIn.fulfilled, (state, action) => {
      state.loggedIn = action.payload.loggedIn;
      state.token = action.payload.token;
    });
    builder.addCase(setLoggedIn.fulfilled, (state, action) => {
      state.loggedIn = action.payload.loggedIn;
      state.token = action.payload.token;
    });
  },
});

export const {toggleLogin} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
