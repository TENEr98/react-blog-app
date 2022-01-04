import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import authSlice from './authSlice'

export default configureStore({
  reducer: {
    auth: authSlice
  },
  middleware: [thunk, logger]
})
