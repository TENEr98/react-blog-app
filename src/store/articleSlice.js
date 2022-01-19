import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { ArticleAPI } from '../api'

const initialState = {
  articleForm: {
    title: '',
    description: '',
    body: '',
    tagList: []
  },
  articleList: null,
  articleItem: null,
  deleteItem: null,
  loading: true,
  error: null
}

export const getArticleList = createAsyncThunk(
  'article/getArticleList',
  async ({ limit, offset }) => {
    const response = await ArticleAPI.getArticleList(limit, offset)
    return response.data
  }
)

export const getArticle = createAsyncThunk(
  'article/getArticle',
  async (slug) => {
    const response = await ArticleAPI.getArticle(slug)
    return response.data
  }
)

export const deleteArticle = createAsyncThunk(
  'article/deleteArticle',
  async (slug) => {
    const response = await ArticleAPI.deleteArticle(slug)
    return response
  }
)

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    onChangeArticleForm: (state, { payload }) => {
      const {
        target: { value, name }
      } = payload
      state.articleForm[name] = value
    }
  },
  extraReducers: {
    [getArticleList.pending]: (state) => {
      state.loading = true
    },
    [getArticleList.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.articleList = payload
    },
    [getArticle.pending]: (state) => {
      state.loading = true
    },
    [getArticle.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.articleItem = payload
    },
    [deleteArticle.pending]: (state) => {
      state.loading = true
    },
    [deleteArticle.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.deleteItem = payload
    }
  }
})

export const { onChangeArticleForm } = articleSlice.actions

export default articleSlice.reducer
