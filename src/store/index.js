import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import articleSlice from './articleSlice'
import authSlice from './authSlice'

const middleware = [thunk]

export default configureStore({
  reducer: {
    auth: authSlice,
    article: articleSlice
  },
  middleware: [...middleware]
})
