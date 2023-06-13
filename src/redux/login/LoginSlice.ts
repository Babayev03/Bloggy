import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface LoginState {
  loggedIn: boolean | null | string;
  token: string;
  loading: 'pending' | 'succeeded' | 'failed';
  userID: string;
}

const initialState: LoginState = {
  loggedIn: false,
  token: 'null',
  loading: 'pending',
  userID: 'null',
};

export const setLoggedIn = createAsyncThunk(
  'login/setLoggedIn',
  async ({
    loggedIn,
    token,
    userID,
  }: {
    loggedIn: string;
    token: string;
    userID: string;
  }) => {
    try {
      await AsyncStorage.setItem('loggedIn', loggedIn.toString());
      await AsyncStorage.setItem('token', token.toString());
      await AsyncStorage.setItem('userID', userID.toString());
      return {loggedIn, token, userID};
    } catch (error) {
      console.log(error);
      return {loggedIn: false, token: 'null', userID: 'null'};
    }
  },
);

export const getLoggedIn = createAsyncThunk('login/getLoggedIn', async () => {
  try {
    const loggedIn = await AsyncStorage.getItem('loggedIn');
    const token = await AsyncStorage.getItem('token');
    const userID = await AsyncStorage.getItem('userID');
    if (loggedIn === null || token === null || userID === null) {
      return {loggedIn: false, token: 'null', userID: 'null'};
    }
    return {loggedIn, token, userID};
  } catch (error) {
    console.log(error);
    return {loggedIn: false, token: 'null', userID: 'null'};
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
    builder
      .addCase(getLoggedIn.fulfilled, (state, action) => {
        state.loggedIn = action.payload.loggedIn;
        state.token = action.payload.token;
        state.userID = action.payload.userID;
        state.loading = 'succeeded';
      })
      .addCase(getLoggedIn.pending, (state, action) => {
        state.loading = 'pending';
      });

    builder.addCase(setLoggedIn.fulfilled, (state, action) => {
      state.loggedIn = action.payload.loggedIn;
      state.token = action.payload.token;
      state.userID = action.payload.userID;
    });
  },
});

export const {toggleLogin} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
