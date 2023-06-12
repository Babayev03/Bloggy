import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ExclusiveGesture} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition';

interface SaveState {
  save: any[];
}

const initialState: SaveState = {
  save: [],
};

export const getSaves = createAsyncThunk('save/getSaves', async () => {
  try {
    const response = await AsyncStorage.getItem('savedBlogs');
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
      const existingSaves = await AsyncStorage.getItem('savedBlogs');
      const existingSaveArray = existingSaves ? JSON.parse(existingSaves) : [];
      if (existingSaveArray.includes(save[0])) {
        const updatedSaves = existingSaveArray.filter(
          (item: any) => item._id !== save[0]._id,
        );
        await AsyncStorage.setItem('savedBlogs', JSON.stringify(updatedSaves));
        return updatedSaves;
      }
      const updatedSaves = [...existingSaveArray, save];

      await AsyncStorage.setItem('savedBlogs', JSON.stringify(updatedSaves));

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
      state.save = state.save.filter(item => item._id !== action.payload._id);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getSaves.pending, state => {})
      .addCase(getSaves.fulfilled, (state, action) => {
        state.save.push(action.payload);
      })
      .addCase(getSaves.rejected, state => {})
      .addCase(setSaves.pending, state => {})
      .addCase(setSaves.fulfilled, (state, action) => {
        state.save.push(action.payload);
      })
      .addCase(setSaves.rejected, state => {});
  },
});

export const {addSave, removeSave} = saveSlice.actions;
export default saveSlice.reducer;
