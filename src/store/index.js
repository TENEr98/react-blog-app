import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import articleSlice from './articleSlice'
import authSlice from './authSlice'

const middleware = [thunk, import.meta.env.DEV && logger]

export default configureStore({
  reducer: {
    auth: authSlice,
    article: articleSlice
  },
  middleware: [...middleware]
})
