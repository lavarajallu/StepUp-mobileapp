import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../types'
import { getLoggedInUser } from '../../utils/helpers/authUtils'
const INIT_STATE = {
  user: getLoggedInUser(),
  loading: false,
}

const selectDomain = (state: RootState) => state.Auth || INIT_STATE

export const selectAuth = createSelector([selectDomain], Auth => Auth)
