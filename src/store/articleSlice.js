import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { ArticleAPI } from '../api'

const initialState = {
  response: null,
  loading: true,
  error: null
}

export const getArticle = createAsyncThunk('article/getArticle', async ({limit, offset}) => {
  console.log(offset)
  const response = await ArticleAPI.getArticle(limit, offset)
  return response.data
})

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: {
    [getArticle.pending]: (state) => {
      state.loading = true
    },
    [getArticle.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.response = payload
    }
  }
})

export default articleSlice.reducer
