import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { AuthAPI } from '../api'

const initialState = {
  signInForm: {
    email: '',
    password: ''
  },
  signUpForm: {
    username: '',
    email: '',
    password: '',
    agreement: false
  },
  editProfileForm: {
    username: '',
    email: '',
    newPassword: '',
    avatarImg: ''
  },
  username: '',
  isAuth: false,
  response: null,
  loading: false,
  error: null
}

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (userData) => {
    const response = await AuthAPI.signUp(userData)
    return response
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData) => {
    const response = await AuthAPI.signIn(userData)
    if (response.status === 200) {
      localStorage.setItem('t', response.data.user.token)
      localStorage.setItem('user', response.data.user.username)
    }
    return response
  }
)

export const getProfile = createAsyncThunk('auth/getProfile', async () => {
  const response = await AuthAPI.getUser()
  return response
})

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData) => {
    const response = await AuthAPI.editUser(userData)
    if (response.status === 200) {
      localStorage.setItem('t', response.data.user.token)
      localStorage.setItem('user', response.data.user.username)
    }
    return response
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChangeSignIn: (state, { payload }) => {
      const {
        target: { value, name }
      } = payload
      state.signInForm[name] = value
    },
    onChangeSignUp: (state, { payload }) => {
      const {
        target: { value, name, checked }
      } = payload
      state.signUpForm[name] = name.includes('agreement') ? checked : value
    },
    onChangeEditProfile: (state, { payload }) => {
      const {
        target: { value, name }
      } = payload
      state.editProfileForm[name] = value
    },
    onChangeLocalStorage: (state, { payload }) => {
      state.username = payload.username
      state.isAuth = payload.isAuth
    }
  },
  extraReducers: {
    [createUser.pending]: (state, _) => {
      state.loading = true
    },
    [createUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.response = payload
    },
    [loginUser.pending]: (state, _) => {
      state.loading = true
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.response = payload
      state.username = payload?.data?.user?.username
      if (payload.status === 200) {
        console.log({ AUTH: state.isAuth })
        state.isAuth = true
      } else if (payload.isAuth !== 200) {
        state.isAuth = false
      }
    },
    [getProfile.pending]: (state, _) => {
      state.loading = true
    },
    [getProfile.fulfilled]: (state, { payload }) => {
      const {
        data: { user }
      } = payload
      state.loading = false
      state.editProfileForm = {
        username: user.username,
        email: user.email,
        newPassword: '',
        avatarImg: user.image
      }
    },
    [updateProfile.pending]: (state, _) => {
      state.loading = true
    },
    [updateProfile.fulfilled]: (state, { payload }) => {
      const {
        data: { user }
      } = payload
      state.loading = false
      state.editProfileForm = {
        username: user.username,
        email: user.email,
        newPassword: '',
        avatarImg: user.image
      }
    }
  }
})

export const {
  onChangeSignIn,
  onChangeSignUp,
  onChangeLocalStorage,
  onChangeEditProfile
} = authSlice.actions

export default authSlice.reducer
