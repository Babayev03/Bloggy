import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SaveState {
  save: any[];
}

const initialState: SaveState = {
  save: [],
};

export const getSaves = createAsyncThunk('save/getSaves', async () => {
  try {
    const response = await AsyncStorage.getItem('save');
    if (response) {
      return response;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
});

export const setSaves = createAsyncThunk(
  'save/setSaves',
  async (save: any[]) => {
    try {
      const existingSaves = await AsyncStorage.getItem('save');
      const existingSaveArray = existingSaves ? JSON.parse(existingSaves) : [];

      const updatedSaves = [...existingSaveArray, ...save];

      await AsyncStorage.setItem('save', JSON.stringify(updatedSaves));

      return updatedSaves;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
);

export const saveSlice = createSlice({
  name: 'save',
  initialState,
  reducers: {
    addSave: (state, action) => {
      state.save.push(action.payload);
    },
    removeSave: (state, action) => {
      state.save = state.save.filter(item => item.id !== action.payload.id);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getSaves.pending, state => {})
      .addCase(getSaves.fulfilled, (state:any, action) => {
        state.save = action.payload;
      })
      .addCase(getSaves.rejected, state => {})
      .addCase(setSaves.pending, state => {})
      .addCase(setSaves.fulfilled, (state, action) => {
        state.save = action.payload;
      })
      .addCase(setSaves.rejected, state => {});
  },
});

export const {addSave, removeSave} = saveSlice.actions;
export default saveSlice.reducer;
