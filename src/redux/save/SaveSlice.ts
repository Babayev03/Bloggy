import {createSlice} from '@reduxjs/toolkit';

interface SaveState {
  save: any[];
}

const initialState: SaveState = {
  save: [],
};

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
});

export const {addSave, removeSave} = saveSlice.actions;
export default saveSlice.reducer;
