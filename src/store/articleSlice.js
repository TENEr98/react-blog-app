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
  response: null,
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

export const createArticle = createAsyncThunk(
  'article/createArticle',
  async (articleData) => {
    const response = await ArticleAPI.createArticle({
      article: { ...articleData }
    })
    return response
  }
)

export const editArticle = createAsyncThunk(
  'article/editArticle',
  async ({ slug, articleData }) => {
    const response = await ArticleAPI.editArticle(slug, {
      article: { ...articleData }
    })
    return response
  }
)

export const deleteArticle = createAsyncThunk(
  'article/deleteArticle',
  async (slug) => {
    const response = await ArticleAPI.deleteArticle(slug)
    return response
  }
)

export const createLikeArticle = createAsyncThunk(
  'article/createLikeArticle',
  async (slug) => {
    const response = await ArticleAPI.createLike(slug)
    return response
  }
)

export const deleteLikeArticle = createAsyncThunk(
  'article/deleteLikeArticle',
  async (slug) => {
    const response = await ArticleAPI.deleteLike(slug)
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
    },
    onChangeArticleTagList: (state, { payload }) => {
      const { idx, event } = payload
      state.articleForm.tagList[idx] = event.target.value
    },
    onAddArticleTag: (state, { payload }) => {
      state.articleForm.tagList.push(payload)
    },
    onRemoveArticleTag: (state, { payload }) => {
      state.articleForm.tagList.splice(payload, 1)
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
      state.articleForm = {
        title: payload.article.title,
        description: payload.article.description,
        body: payload.article.body,
        tagList: payload.article.tagList
      }
    },
    [deleteArticle.pending]: (state) => {
      state.loading = true
    },
    [deleteArticle.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.deleteItem = payload
    },
    [createArticle.pending]: (state) => {
      state.loading = true
    },
    [createArticle.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.response = payload
    },
    [editArticle.pending]: (state) => {
      state.loading = true
    },
    [editArticle.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.response = payload
    },
    [createLikeArticle.pending]: (state) => {
      state.loading = true
    },
    [createLikeArticle.fulfilled]: (state, { payload }) => {
      state.loading = false
      const idx = state.articleList.articles.findIndex(
        (item) => item.title === payload.data.article.title
      )
      state.articleList.articles[idx] = payload.data.article
    },
    [deleteLikeArticle.pending]: (state) => {
      state.loading = true
    },
    [deleteLikeArticle.fulfilled]: (state, { payload }) => {
      state.loading = false
      console.log({ item: payload.data.article })
      const idx = state.articleList.articles.findIndex(
        (item) => item.title === payload.data.article.title
      )
      state.articleList.articles[idx] = payload.data.article
    }
  }
})

export const {
  onChangeArticleForm,
  onChangeArticleTagList,
  onAddArticleTag,
  onRemoveArticleTag
} = articleSlice.actions

export default articleSlice.reducer
