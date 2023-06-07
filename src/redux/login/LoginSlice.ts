import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface LoginState {
  loggedIn: boolean|null|string;
}

const initialState: LoginState = {
  loggedIn: false,
};

export const setLoggedIn = createAsyncThunk(
  'login/setLoggedIn',
  async (loggedIn: boolean) => {
    try {
      await AsyncStorage.setItem('loggedIn', loggedIn.toString());
      return loggedIn;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
);

export const getLoggedIn = createAsyncThunk('login/getLoggedIn', async () => {
  try {
    const loggedIn = await AsyncStorage.getItem('loggedIn');
    return loggedIn;
  } catch (error) {
    console.log(error);
    return false;
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    toggleLogin: state => {
        state.loggedIn = !state.loggedIn;
        }
  },
  extraReducers: builder => {
    builder.addCase(getLoggedIn.fulfilled, (state, action) => {
      state.loggedIn = action.payload;
    });
    builder.addCase(setLoggedIn.fulfilled, (state, action) => {
      state.loggedIn = action.payload;
    });
  },
});

export const {toggleLogin} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;