import { PayloadAction, createAction } from '@reduxjs/toolkit'
import { createSlice } from '../../utils/@reduxjs/toolkit'
import { Boards } from './types'
const getBoards = createAction<any>('boards/getBoards')
const getBoardById = createAction<any>('boards/getBoardById')
const addNewBoard = createAction<any>('boards/addNewBoard')
const updateBoard = createAction<any>('boards/updateBoard')
const deleteBoard = createAction<any>('boards/deleteBoard')

// Branches

const getBranches = createAction<any>('boards/getBranches')
const getBranchById = createAction<any>('boards/getBranchById')
const addNewBranch = createAction<any>('boards/addNewBranch')
const updateBranch = createAction<any>('boards/updateBranch')
const deleteBranch = createAction<any>('boards/deleteBranch')

// Grades

const getGrades = createAction<any>('boards/getGrades')
const getGradeById = createAction<any>('boards/getBranchById')
const addNewGrade = createAction<any>('boards/addNewGrade')
const updateGrade = createAction<any>('boards/updateGrade')
const deleteGrade = createAction<any>('boards/deleteGrade')

// Subjects

const getSubjects = createAction<any>('boards/getSubjects')
const getSubjectById = createAction<any>('boards/getSubjectById')
const addNewSubject = createAction<any>('boards/addNewSubject')
const updateSubject = createAction<any>('boards/updateSubject')
const deleteSubject = createAction<any>('boards/deleteSubject')


// Chapters

const getChapters = createAction<any>('boards/getChapters')
const getChapterById = createAction<any>('boards/getChapterById')
const addNewChapter = createAction<any>('boards/addNewChapter')
const updateChapter = createAction<any>('boards/updateChapter')
const deleteChapter = createAction<any>('boards/deleteChapter')


// Topics

const getTopics = createAction<any>('boards/getTopics')
const getTopicById = createAction<any>('boards/getTopicById')
const addNewTopic = createAction<any>('boards/addNewTopic')
const updateTopic = createAction<any>('boards/updateTopic')
const deleteTopic = createAction<any>('boards/deleteTopic')

export const initialState: Boards = {
  boards: [],
  board: {},
  branches: [],
  branch: {},
  grades: [],
  grade: {},
  subjects: [],
  subject: {},
  chapters: [],
  chapter: {},
  topics: [],
  topic: {},
}
const BoardsSlice = createSlice({
  name: 'Boards',
  initialState,
  reducers: {
    setBoardsData(state, action: PayloadAction<any>) {
      state.boards = action.payload
    },
    setBoard(state, action: PayloadAction<any>) {
      state.board = action.payload
    },
    setBranchesData(state, action: PayloadAction<any>) {
      state.branches = action.payload
    },
    setBranch(state, action: PayloadAction<any>) {
      state.branch = action.payload
    },
    setGradesData(state, action: PayloadAction<any>) {
      state.grades = action.payload
    },
    setGrade(state, action: PayloadAction<any>) {
      state.grade = action.payload
    },
    setSubjectsData(state, action: PayloadAction<any>) {
      state.subjects = action.payload
    },
    setSubject(state, action: PayloadAction<any>) {
      state.subject = action.payload
    },
    setChaptersData(state, action: PayloadAction<any>) {
      state.chapters = action.payload
    },
    setChapter(state, action: PayloadAction<any>) {
      state.chapter = action.payload
    },
    setTopicsData(state, action: PayloadAction<any>) {
      state.topics = action.payload
    },
    setTopic(state, action: PayloadAction<any>) {
      state.topic = action.payload
    },
  },
})
export {
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
}

export const { actions, reducer, name: sliceKey } = BoardsSlice
