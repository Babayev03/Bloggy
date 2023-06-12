import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BlogState {
  datas: any[];
  loading: string;
  error: string;
  data: any[];
}

const initialState: BlogState = {
  datas: [],
  loading: 'pending' || 'fulfilled' || 'rejected',
  error: '',
  data: [],
};

export const getAllblog = createAsyncThunk('blog/getAllblog', async () => {
  const token = await AsyncStorage.getItem('token');

  const response: any = await axios
    .get('http://192.168.0.112:3000/api/blogs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(err => {
      console.log(err);
    });

  return response.data;
});

export const getBlogById = createAsyncThunk(
  'blog/getBlogById',
  async (id: string) => {
    const token = await AsyncStorage.getItem('token');

    const response = await axios.get(
      `http://192.168.0.112:3000/api/blogs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  },
);

export const addBlog = createAsyncThunk('blog/addBlog', async (item: any) => {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.post(
    'http://192.168.0.112:3000/api/blogs/',
    item,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
});

export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async (item: any) => {
    console.log(item);
    
    const token = await AsyncStorage.getItem('token');
    const response = await axios.put(
      `http://192.168.0.112:3000/api/blogs/${item.id}`,
      {title: item.title, description: item.description},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  },
);

export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (id: any) => {
    const token = await AsyncStorage.getItem('token');
    console.log(id);

    const response = await axios.delete(
      `http://192.168.0.112:3000/api/blogs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  },
);

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllblog.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllblog.fulfilled, (state, action) => {
      state.datas = action.payload;
      state.loading = 'fulfilled';
    });
    builder.addCase(getAllblog.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = 'rejected';
    });
    builder.addCase(getBlogById.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(getBlogById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = 'fulfilled';
    });
    builder.addCase(getBlogById.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = 'rejected';
    });
    builder.addCase(addBlog.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(addBlog.fulfilled, (state, action) => {
      state.datas.push(action.payload);
      state.loading = 'fulfilled';
    });
    builder.addCase(addBlog.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = 'rejected';
    });
    builder.addCase(updateBlog.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      state.data = action.payload;
      state.datas = state.datas.map((item: any) =>
        item._id === action.payload._id ? action.payload : item,
      );
      state.loading = 'fulfilled';
    });
    builder.addCase(updateBlog.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = 'rejected';
    });
    builder.addCase(deleteBlog.pending, (state, action) => {});
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.datas = state.datas.filter(
        (item: any) => item._id !== action.payload._id,
      );
      state.loading = 'fulfilled';
    });
    builder.addCase(deleteBlog.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = 'rejected';
    });
  },
});

export const blogReducer = blogSlice.reducer;
