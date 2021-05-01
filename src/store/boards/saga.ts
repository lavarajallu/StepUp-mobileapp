import { baseAxios } from '../../api/axios'
import { apiEndPoints } from '../../api/variables'
import { call, put, takeLatest, all, select } from 'redux-saga/effects'
import { selectBoards } from './selectors'
import {
  actions,
  getBoards,
  addNewBoard,
  getBoardById,
  deleteBoard,
  updateBoard,
  getBranches,
  addNewBranch,
  getBranchById,
  deleteBranch,
  updateBranch,
  getGrades,
  addNewGrade,
  getGradeById,
  deleteGrade,
  updateGrade,
  getSubjects,
  addNewSubject,
  getSubjectById,
  deleteSubject,
  updateSubject,
  getChapters,
  addNewChapter,
  getChapterById,
  deleteChapter,
  updateChapter,
  getTopics,
  addNewTopic,
  getTopicById,
  deleteTopic,
  updateTopic,
} from './slice'
function* fetchBoardsData(payload: ReturnType<typeof Object>) {
  try {
    console.log('payloaddddd', payload.payload)
    const offsetValue:any = payload?.payload?.offset || 0
    const limitValue:any = payload?.payload?.offset || 4
    const response = yield call(
      baseAxios.get,
      apiEndPoints.adminEndPoints.boards.allBoards +
        `?offset=${offsetValue}&limit=${limitValue}&order_by=name&sort_order=DESC`,
    )
    yield put(actions.setBoardsData(response.data.data))
  } catch (err) {
    console.log(err.response)
  }
}
function* fetchBoardById({ payload }: ReturnType<typeof getBoardById>) {
  try {
    const response = yield call(
      baseAxios.get,
      apiEndPoints.adminEndPoints.boards.boardById(payload),
    )
    debugger
    yield put(actions.setBoard(response.data.data))
  } catch (err) {
    console.log(err)
  }
}
function* deleteBoardById({ payload }: ReturnType<typeof deleteBoard>) {
  try {
    const response = yield call(
      baseAxios.delete,
      apiEndPoints.adminEndPoints.boards.boardById(payload),
    )
    yield put(getBoards({}))
  } catch (err) {
    console.log(err)
  }
}
function* createBoard({ payload }: ReturnType<typeof addNewBoard>) {
  try {
    const response = yield call(
      baseAxios.post,
      apiEndPoints.adminEndPoints.boards.addBoard,
      payload.data,
    )
    payload.history.push('/boards')
  } catch (err) {
    console.log(err)
  }
}

function* updateBoardById({ payload }: ReturnType<typeof updateBoard>) {
  try {
    const state = yield select(selectBoards)
    const response = yield call(
      baseAxios.put,
      apiEndPoints.adminEndPoints.boards.boardById(state.board.reference_id),
      payload.data,
    )
    payload.history.push('/boards')
  } catch (err) {
    console.log(err)
  }
}

/// Branches
function* fetchBranchesData({ payload }: ReturnType<typeof getBranches>) {
  try {
    const response = yield call(
      baseAxios.get,
      apiEndPoints.adminEndPoints.boards.allBranches(payload),
      {
        params: {
          offset: 0,
          limit: 10,
        },
      },
    )
    yield put(actions.setBranchesData(response.data.data))
  } catch (err) {
    console.log(err)
  }
}
function* fetchBranchById({ payload }: ReturnType<typeof getBranchById>) {
  try {
    const response = yield call(
      baseAxios.get,
      apiEndPoints.adminEndPoints.boards.branchById(payload),
    )
    yield put(actions.setBranch(response.data.data))
  } catch (err) {
    console.log(err)
  }
}
function* createBranch({ payload }: ReturnType<typeof addNewBranch>) {
  try {
    const response = yield call(
      baseAxios.post,
      apiEndPoints.adminEndPoints.boards.addBranch,
      payload.data,
    )
    payload.history.push(`/boards/${payload.data.board_id}/branches`)
  } catch (err) {
    console.log(err)
  }
}
function* deleteBranchById({ payload }: ReturnType<typeof deleteBranch>) {
  try {
    const response = yield call(
      baseAxios.delete,
      apiEndPoints.adminEndPoints.boards.branchById(payload),
    )
    // yield put(getBranches({}))
    payload.history.push(`/boards/`)
  } catch (err) {
    console.log(err)
  }
}

function* updateBranchById({ payload }: ReturnType<typeof updateBranch>) {
  try {
    const state = yield select(selectBoards)
    const response = yield call(
      baseAxios.put,
      apiEndPoints.adminEndPoints.boards.branchById(state.branch.reference_id),
      payload.data,
    )
    payload.history.push(`/boards/${payload.data.board_id}/branches`)
  } catch (err) {
    console.log(err)
  }
}

///  Grades

function* fetchGradesData({ payload }: ReturnType<typeof getGrades>) {
  try {
    const { board_id, branch_id } = payload
    const response = yield call(
      baseAxios.get,
      apiEndPoints.adminEndPoints.boards.allGrades(board_id, branch_id),
      {
        params: {
          offset: 0,
          limit: 10,
        },
      },
    )
    yield put(actions.setGradesData(response.data.data))
  } catch (err) {
    console.log(err)
  }
}
function* fetchGradeById({ payload }: ReturnType<typeof getGradeById>) {
  try {
    const response = yield call(
      baseAxios.get,
      apiEndPoints.adminEndPoints.boards.gradeById(payload),
    )
    yield put(actions.setBoard(response.data.data))
  } catch (err) {
    console.log(err)
  }
}
function* createGrade({ payload }: ReturnType<typeof addNewGrade>) {
  try {
    const response = yield call(
      baseAxios.post,
      apiEndPoints.adminEndPoints.boards.addGrade,
      payload.data,
    )

    payload.history.push(
      `/boards/${payload.data.board_id}/branches/${payload.data.branch_id}/grades/`,
    )
  } catch (err) {
    console.log(err)
  }
}
function* deleteGradeById({ payload }: ReturnType<typeof deleteGrade>) {
  try {
    const response = yield call(
      baseAxios.delete,
      apiEndPoints.adminEndPoints.boards.gradeById(payload),
    )
    //  yield put(getBoards({}))
    payload.history.push(`/boards`)
  } catch (err) {
    console.log(err)
  }
}

function* updateGradeById({ payload }: ReturnType<typeof updateGrade>) {
  try {
    const state = yield select(selectBoards)
    const response = yield call(
      baseAxios.put,
      apiEndPoints.adminEndPoints.boards.gradeById(state.grade.reference_id),
      payload.data,
    )
    payload.history.push(
      `/boards/${payload.data.board_id}/branches/${payload.data.branch_id}/grades/`,
    )
  } catch (err) {
    console.log(err)
  }
}

// Subjects

function* fetchSubjectsData({ payload }: ReturnType<typeof getSubjects>) {
  console.log("payloadd",payload)
  try {
    const { user_id } = payload
    const response = yield call(
      baseAxios.get,
      apiEndPoints.adminEndPoints.boards.allSubjects(
       user_id,
      ),
      {
        params: {
          offset: 0,
          limit: 10,
        },
      },
    )
    console.log("response",response.data.data)
    yield put(actions.setSubjectsData(response.data.data))
  } catch (err) {
    console.log(err)
  }
}
function* fetchSubjectById({ payload }: ReturnType<typeof getSubjectById>) {
  try {
    const response = yield call(
      baseAxios.get,
      apiEndPoints.adminEndPoints.boards.subjectById(payload),
    )
    debugger
    yield put(actions.setSubject(response.data.data))
  } catch (err) {
    console.log(err)
  }
}
function* createSubject({ payload }: ReturnType<typeof addNewSubject>) {
  try {
    const response = yield call(
      baseAxios.post,
      apiEndPoints.adminEndPoints.boards.addSubject,
      payload.data,
    )
    payload.history.push(
      `/boards/${payload.data.board_id}/branches/${payload.data.branch_id}/grades/${payload.data.grade_id}/subjects`,
    )
  } catch (err) {
    console.log(err)
  }
}
function* deleteSubjectById({ payload }: ReturnType<typeof deleteSubject>) {
  try {
    const response = yield call(
      baseAxios.delete,
      apiEndPoints.adminEndPoints.boards.subjectById(payload),
    )
    yield put(getBoards({}))
  } catch (err) {
    console.log(err)
  }
}

function* updateSubjectById({ payload }: ReturnType<typeof updateSubject>) {
  try {
    const state = yield select(selectBoards)
    const response = yield call(
      baseAxios.put,
      apiEndPoints.adminEndPoints.boards.subjectById(state.subject.id),
      payload.data,
    )
    payload.history.push(
      `/boards/${payload.data.board_id}/branches/${payload.data.branch_id}/grades/${payload.data.grade_id}/subjects`,
    )
  } catch (err) {
    console.log(err)
  }
}

// Chapters

function* fetchChaptersData({ payload }: ReturnType<typeof Object>) {
  console.log("chapterspay",payload)
  try {
    const {grade_id,subject_id,school_id,section_id } = payload
    console.log("chapterspay",payload)
    const response = yield call(
      baseAxios.get,
      apiEndPoints.adminEndPoints.boards.allChapters(
        school_id,
        section_id,
        grade_id,
        subject_id,
      ),
      {
        params: {
          offset: 0,
          limit: 10,
        },
      },
    )
    yield put(actions.setChaptersData(response.data.data))
  } catch (err) {
    console.log(err)
  }
}
function* fetchChapterById({ payload }: ReturnType<typeof getChapterById>) {
  try {
    const response = yield call(
      baseAxios.get,
      apiEndPoints.adminEndPoints.boards.chapterById(payload),
    )
    debugger
    yield put(actions.setChapter(response.data.data))
  } catch (err) {
    console.log(err)
  }
}
function* createChapter({ payload }: ReturnType<typeof addNewChapter>) {
  try {
    const response = yield call(
      baseAxios.post,
      apiEndPoints.adminEndPoints.boards.addChapter,
      payload.data,
    )
    payload.history.push(
      `/boards/${payload.data.board_id}/branches/${payload.data.branch_id}/grades/${payload.data.grade_id}/subjects/${payload.data.subject_id}/chapters`,
    )
  } catch (err) {
    console.log(err)
  }
}
function* deleteChapterById({ payload }: ReturnType<typeof deleteChapter>) {
  try {
    const response = yield call(
      baseAxios.delete,
      apiEndPoints.adminEndPoints.boards.chapterById(payload),
    )
    yield put(getBoards({}))
  } catch (err) {
    console.log(err)
  }
}

function* updateChapterById({ payload }: ReturnType<typeof updateChapter>) {
  try {
    const state = yield select(selectBoards)
    const response = yield call(
      baseAxios.put,
      apiEndPoints.adminEndPoints.boards.chapterById(state.subject.id),
      payload.data,
    )
    payload.history.push(
      `/boards/${payload.data.board_id}/branches/${payload.data.branch_id}/grades/${payload.data.grade_id}/subjects/${payload.data.subject_id}/chapters`,
    )
  } catch (err) {
    console.log(err)
  }
}

// Topics

function* fetchTopicsData({ payload }: ReturnType<typeof getTopics>) {
  try {
    const { board_id, branch_id, grade_id, subject_id, chapter_id } = payload
    const response = yield call(
      baseAxios.get,
      apiEndPoints.adminEndPoints.boards.allTopics(
        board_id,
        branch_id,
        grade_id,
        subject_id,
        chapter_id,
      ),
      {
        params: {
          offset: 0,
          limit: 10,
        },
      },
    )
    yield put(actions.setTopicsData(response.data.data))
  } catch (err) {
    console.log(err)
  }
}
function* fetchTopicById({ payload }: ReturnType<typeof getTopicById>) {
  try {
    const response = yield call(
      baseAxios.get,
      apiEndPoints.adminEndPoints.boards.topicById(payload),
    )
    yield put(actions.setTopic(response.data.data))
  } catch (err) {
    console.log(err)
  }
}
function* createTopic({ payload }: ReturnType<typeof addNewTopic>) {
  try {
    const response = yield call(
      baseAxios.post,
      apiEndPoints.adminEndPoints.boards.addTopic,
      payload.data,
    )
    payload.history.push(
      `/boards/${payload.data.board_id}/branches/${payload.data.branch_id}/grades/${payload.data.grade_id}/subjects/${payload.data.subject_id}/chapters/${payload.data.chapter_id}/topics`,
    )
  } catch (err) {
    console.log(err)
  }
}
function* deleteTopicById({ payload }: ReturnType<typeof deleteTopic>) {
  try {
    const response = yield call(
      baseAxios.delete,
      apiEndPoints.adminEndPoints.boards.topicById(payload),
    )
    yield put(getTopics({}))
  } catch (err) {
    console.log(err)
  }
}

function* updateTopicById({ payload }: ReturnType<typeof updateTopic>) {
  try {
    const state = yield select(selectBoards)
    const response = yield call(
      baseAxios.put,
      apiEndPoints.adminEndPoints.boards.topicById(state.subject.id),
      payload.data,
    )
    payload.history.push(
      `/boards/${payload.data.board_id}/branches/${payload.data.branch_id}/grades/${payload.data.grade_id}/subjects/${payload.data.subject_id}/chapters/${payload.data.chapter_id}/topics`,
    )
  } catch (err) {
    console.log(err)
  }
}

export function* boardsSaga() {
  yield all([yield takeLatest(getBoards, fetchBoardsData)])
  yield all([yield takeLatest(addNewBoard, createBoard)])
  yield all([yield takeLatest(getBoardById, fetchBoardById)])
  yield all([yield takeLatest(deleteBoard, deleteBoardById)])
  yield all([yield takeLatest(updateBoard, updateBoardById)])
  // Branches
  yield all([yield takeLatest(getBranches, fetchBranchesData)])
  yield all([yield takeLatest(addNewBranch, createBranch)])
  yield all([yield takeLatest(getBranchById, fetchBranchById)])
  yield all([yield takeLatest(deleteBranch, deleteBranchById)])
  yield all([yield takeLatest(updateBranch, updateBranchById)])
  // Grades
  yield all([yield takeLatest(getGrades, fetchGradesData)])
  yield all([yield takeLatest(addNewGrade, createGrade)])
  yield all([yield takeLatest(getGradeById, fetchGradeById)])
  yield all([yield takeLatest(deleteGrade, deleteGradeById)])
  yield all([yield takeLatest(updateGrade, updateGradeById)])
  // Subjects
  yield all([yield takeLatest(getSubjects, fetchSubjectsData)])
  yield all([yield takeLatest(addNewSubject, createSubject)])
  yield all([yield takeLatest(getSubjectById, fetchSubjectById)])
  yield all([yield takeLatest(deleteSubject, deleteSubjectById)])
  yield all([yield takeLatest(updateSubject, updateSubjectById)])
  // Chapters
  yield all([yield takeLatest(getChapters, fetchChaptersData)])
  yield all([yield takeLatest(addNewChapter, createChapter)])
  yield all([yield takeLatest(getChapterById, fetchChapterById)])
  yield all([yield takeLatest(deleteChapter, deleteChapterById)])
  yield all([yield takeLatest(updateSubject, updateChapterById)])
  // Topics
  yield all([yield takeLatest(getTopics, fetchTopicsData)])
  yield all([yield takeLatest(addNewTopic, createTopic)])
  yield all([yield takeLatest(getTopicById, fetchTopicById)])
  yield all([yield takeLatest(deleteTopic, deleteTopicById)])
  yield all([yield takeLatest(updateTopic, updateTopicById)])
}
