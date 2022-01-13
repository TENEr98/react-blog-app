import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import articleSlice from './articleSlice'
import authSlice from './authSlice'

export default configureStore({
  reducer: {
    auth: authSlice,
    article: articleSlice
  },
  middleware: [thunk, logger]
})
