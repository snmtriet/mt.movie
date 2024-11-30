import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type MovieState = {
  modalMovie: {
    open: boolean
    slug?: string
  }
}

const initialState: MovieState = {
  modalMovie: {
    open: false,
    slug: '',
  },
}

export const movieSlice = createSlice({
  name: SLICE_BASE_NAME,
  initialState,
  reducers: {
    setModalMovie: (
      state,
      action: PayloadAction<{
        open: boolean
        slug?: string
      }>,
    ) => {
      state.modalMovie = action.payload
    },
  },
})

export const { setModalMovie } = movieSlice.actions

export default movieSlice.reducer
