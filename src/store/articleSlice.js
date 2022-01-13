import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { ArticleAPI } from '../api'

const initialState = {
  response: null,
  loading: false,
  error: null
}

export const getArticle = createAsyncThunk('article/getArticle', async () => {
  const response = await ArticleAPI.getArticle()
  return response.data
})

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: {
    [getArticle.pending]: (state, _) => {
      state.loading = true
    },
    [getArticle.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.response = payload
    }
  }
})

export default articleSlice.reducer
