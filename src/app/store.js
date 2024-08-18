import { configureStore } from '@reduxjs/toolkit'
import reactionReducer from '../reducer/reactionSlice'

export default configureStore({
  reducer: {
    reaction: reactionReducer
  },
})