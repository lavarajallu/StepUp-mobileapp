type config = {
  baseUrl: string
  s3Bucket: string
}
const config: config = {
  baseUrl: 'http://65.1.123.182:3000',
  // s3Bucket: `https://smarttesting.s3.ap-south-1.amazonaws.com`,
  s3Bucket: `https://iconed.s3-ap-southeast-1.amazonaws.com`,
  // baseUrlV2: `http://localhost:4000/api/v1`,
}
const apiEndPoints = {
  teacherEndPoints: {},
  studentEndPoints: {},
  adminEndPoints: {
    universalLibrary: {
      data: 'dummyendpoint',
      allSubjects: 'universalSubject',
      addSubjects: 'universalSubject',
      subjectById: (id: string) => `universalSubject/${id}`,

      getTopicsBySubject: (subject: string) => `universaltopic/${subject}`,
      addTopic: 'universaltopic',
      topicById: (id: string) => `universaltopic/topic/${id}`,

      activitiesList: 'activities/masterList',
      assignedActvities: (id: string) => `activities/${id}`,
      getActById: (id: string) => `activities/actInfo/${id}`,
      addActivity: 'activities',

      addActivityInfo: 'activities/saveActivityInfo',
      getActivityInfoByActId: (id: string) => `activities/info/${id}`,
      // deleteAssignAct: '',
      // updateActTitle: '',
      // getActivityById: '',
      addQuestion: 'question',
      getQuestionByActivity: (activity: string) => `question/list/${activity}`,
      deleteQuestion: (id: string) => `question/${id}`,

      uploadTos3: '/activities/uploadToS3',
      enumValues: 'user/enum/levels',
    },
    boards: {
      // allBoards: `board`,
      // addBoard: `board`,
      // boardById: (id: string) => `board/${id}`,
      // allBranches: (id: string) => `/branch?board=${id}`,
      // addBranch: `branch`,
      // branchById: (id: string) => `branch/${id}`,
      // allGrades: (board_id: string, branch_id: string) =>
      //   `/grade?board=${board_id}&branch=${branch_id}`,
      // addGrade: `grade`,
      // gradeById: (id: string) => `grade/${id}`,
      allSubjects: (user_id: string) =>
        `/student/subjects/${user_id}`,
      // addSubject: `subject`,
      // subjectById: (id: string) => `subject/${id}`,
      allChapters: (
        section_id: string,
        school_id: string,
        grade_id: string,
        subject_id: string,
      ) =>
        `/student/chapter/${grade_id}/${subject_id}?school_id=${school_id}&section_id=${section_id}`,
      // addChapter: `chapter`,
      // chapterById: (id: string) => `chapter/${id}`,
      allTopics: (
        board_id: string,
        branch_id: string,
        grade_id: string,
        subject_id: string,
        chapter_id: string,
      ) =>
        `/topic?board=${board_id}&branch=${branch_id}&grade=${grade_id}&subject=${subject_id}&chapter=${chapter_id}`,
      addTopic: `topic`,
      topicById: (id: string) => `topic/${id}`,
    },
    users: {
      allUsers: `user`,
      addUser: `/user/register`,
      userById: (id: string) => `user/${id}`,
    },
    schools: {
      allSchools: `school`,
      schoolById: (id: string) => `school/${id}`,
      addSchool: `school`,
    },
  },
  authEndPoints: {
    login: `/user/login`,

    register: `/user/register`
  },
}
export { config, apiEndPoints }
