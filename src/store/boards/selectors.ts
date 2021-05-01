import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../types'
import { initialState } from './slice'

const selectDomain = (state: RootState) => state.Boards || initialState

export const selectBoards = createSelector([selectDomain], Boards => Boards)
