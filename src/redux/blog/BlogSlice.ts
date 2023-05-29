import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

interface BlogState {
  data: [];
  loading: string;
  error: string;
}

const initialState: BlogState = {
  data: [],
  loading: 'pending' || 'fulfilled' || 'rejected',
  error: '',
};

export const getAllblog = createAsyncThunk('blog/getAllblog', async () => {
  const response = await axios.get(
    'https://64731455d784bccb4a3c3e14.mockapi.io/blogs/',
  );
  return response.data;
});

export const getBlogById = createAsyncThunk(
  'blog/getBlogById',
  async (id: string) => {
    console.log('id', id);
    
    const response = await axios.get(
      `https://64731455d784bccb4a3c3e14.mockapi.io/blogs/${id}`,
    );
    return response.data;
  },
);

export const addBlog = createAsyncThunk('blog/addBlog', async (item: any) => {
  const response = await axios.post(
    'https://64731455d784bccb4a3c3e14.mockapi.io/blogs/',
    item,
  );
  return response.data;
});

export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async (item: any) => {
    const response = await axios.put(
      `https://64731455d784bccb4a3c3e14.mockapi.io/blogs/${item.id}`,
      item,
    );
    return response.data;
  },
);

export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (id: string) => {
    const response = await axios.delete(
      `https://64731455d784bccb4a3c3e14.mockapi.io/blogs/${id}`,
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
      state.data = action.payload;
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
      state.data = action.payload;
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
      state.loading = 'fulfilled';
    });
    builder.addCase(updateBlog.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = 'rejected';
    });
    builder.addCase(deleteBlog.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = 'fulfilled';
    });
    builder.addCase(deleteBlog.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = 'rejected';
    });
  },
});

export const blogReducer = blogSlice.reducer;
