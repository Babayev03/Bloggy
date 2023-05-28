import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

interface BlogState {
  data: [];
  loading: boolean;
  error: string;
}

const initialState: BlogState = {
  data: [],
  loading: false,
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

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
});
