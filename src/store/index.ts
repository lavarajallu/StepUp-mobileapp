import { RootState } from '../types'
/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit'
import { all, fork } from 'redux-saga/effects'
import { InjectedReducersType } from '../utils/types/injector-typings'
//import appMenuSaga from './appMenu/saga'
import authSaga from './auth/saga'
// import LayoutSaga from './layout/saga'
// import Layout from './layout/reducers'
 import Auth from './auth/reducers'
// import AppMenu from './appMenu/reducers'
// import { reducer as UniversalLibrary } from './universal-library/slice'
 import { reducer as Boards } from './boards/slice'
// import { reducer as Users } from './user-management/slice'
// import { reducer as Schools } from './school-management/slice'
// import { universalLibrarySaga } from './universal-library/saga'
 import { boardsSaga } from './boards/saga'
// import { universalTopicsSaga } from './universalTopics/saga';
// import { reducer as universalTopics } from './universalTopics/slice';
// import { universalActivitiesSaga } from './universalActivities/saga';
// import { reducer  as universalActivities } from './universalActivities/slice';
// import { universalWeblinkSaga } from './Activities/weblinks/saga';
// import { reducer as weblink  } from './Activities/weblinks/slice';
// import { schoolsSaga } from './school-management/saga'
// import { usersSaga } from './user-management/saga'
// import { universalVideoSaga } from './Activities/videos/saga'
// import { reducer as video } from './Activities/videos/slice';
// /**
//  * Merges the main reducer with the router state and dynamically injected reducers
//  */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error

  return combineReducers({
    Auth,
    // AppMenu,
    // Layout,
    // UniversalLibrary,
    // universalTopics,
    // universalActivities,
    // weblink,
    Boards,
    // video,
    // Schools,
    // Users,
    ...injectedReducers,
  })
}
export function* rootSaga() {
  yield all([
    //fork(appMenuSaga),
    fork(authSaga),
    // fork(LayoutSaga),
    // fork(universalLibrarySaga),
     fork(boardsSaga),
    // fork(universalTopicsSaga),
    // fork(universalActivitiesSaga),
    // fork(universalWeblinkSaga),
    // fork(usersSaga),
    // fork(schoolsSaga),
    // fork(universalVideoSaga),
  ])
}
