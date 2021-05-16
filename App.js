/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *

 * @format
 * @flow strict-local
 */

import React, { Component, useState, useEffect } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import {
  Login, ViewSolutions, Practice, PrePaperReview, MockTestReview, MockTestPapers, MockTestSolutions,
  MockTestAssesment, MockTestSummary, MockTest, PrePaperSummary, Register, PrePaperSolutions, Announcements,
  ForgotPassword, TopicMainView, PrePaperAssesment, PreQuestionPapers, ReviewPostSummary, Subjects, ProgressTopics,
  Otp, Boards, PreviousPapers, Grades, Dashboard, Chapters, Topics, PostSummary, PostAssesment, LeaderBoard,
  PreAssesment, PreSummary, TopicInDetails, WebLinkView, PracticeChapter, PracticeAssesment, PracticeSummary, Settings,
  PracticeSolutions, PracticeReview, Profile, Games, VideoView, EditProfile, Analysis, ObjectAssesment, Notifications, PdfViewNew, NormalVideo, ReferView, ChangePassword, ContactUs, PreSolutions
} from './src/containers'

import VideoActivity from './Video'
import LoadingScreen from './src/containers/LoadingScreen'
import PushNotificationIOS from '@react-native-community/push-notification-ios';
const App = () => {
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    PushNotificationIOS.requestPermissions([permissions]);
  });
  // const setNotificationCategories = () => {
  //   PushNotificationIOS.setNotificationCategories([
  //     {
  //       id: 'userAction',
  //       actions: [
  //         { id: 'open', title: 'Open', options: { foreground: true } },
  //         {
  //           id: 'ignore',
  //           title: 'Desruptive',
  //           options: { foreground: true, destructive: true },
  //         },
  //         {
  //           id: 'text',
  //           title: 'Text Input',
  //           options: { foreground: true },
  //           textInput: { buttonTitle: 'Send' },
  //         },
  //       ],
  //     },
  //   ]);
  // };
  // const onRemoteNotification = (notification) => {
  //   const actionIdentifier = notification.getActionIdentifier();

  //   if (actionIdentifier === 'open') {
  //     // Perform action based on open action
  //   }

  //   if (actionIdentifier === 'text') {
  //     // Text that of user input.
  //     const userText = notification.getUserText();
  //     // Perform action based on textinput action
  //   }
  // };
  return (
    <Router>
      <Stack key="root" hideNavBar={true}>
        <Scene key="video" component={VideoActivity} />
        <Scene key='loadingscreen' component={LoadingScreen} initial={true} />
        <Scene key="login" component={Login} />
        <Scene key="register" component={Register} />
        <Scene key="forgotPassword" component={ForgotPassword} />
        <Scene key="otp" component={Otp} />
        <Scene key="boards" component={Boards} />
        <Scene key="grades" component={Grades} />
        <Scene key="subjects" component={Subjects} />
        <Scene key="dashboard" component={Dashboard} />
        <Scene key="chapters" component={Chapters} />
        <Scene key="topics" component={Topics} />
        <Scene key="preassesment" component={PreAssesment} />
        <Scene key="presummary" component={PreSummary} />
        <Scene key="presolutions" component={PreSolutions} />
        <Scene key="topicindetails" component={TopicInDetails} />
        <Scene key="videoview" component={VideoView} />
        <Scene key="normalvideoview" component={NormalVideo} />
        <Scene key="weblinkview" component={WebLinkView} />
        <Scene key="postassesment" component={PostAssesment} />
        <Scene key="postsummary" component={PostSummary} />
        <Scene key="viewsolutions" component={ViewSolutions} />
        <Scene key="topicmainview" component={TopicMainView} />
        <Scene key="progresstopics" component={ProgressTopics} />
        <Scene key="previouspapers" component={PreviousPapers} />
        <Scene key="prequestionpapers" component={PreQuestionPapers} />
        <Scene key="reviewpostsummary" component={ReviewPostSummary} />
        <Scene key='prepaperassesment' component={PrePaperAssesment} />
        <Scene key="prepapersummary" component={PrePaperSummary} />
        <Scene key="prepapersolutions" component={PrePaperSolutions} />
        <Scene key="prepaperreview" component={PrePaperReview} />
        <Scene key="mocktest" component={MockTest} />
        <Scene key="mocktestpapers" component={MockTestPapers} />
        <Scene key="mocktestassesment" component={MockTestAssesment} />
        <Scene key="mocktestsummary" component={MockTestSummary} />
        <Scene key="mocktestsolutions" component={MockTestSolutions} />
        <Scene key="mocktestreview" component={MockTestReview} />

        <Scene key="practice" component={Practice} />
        <Scene key="practicechapter" component={PracticeChapter} />
        <Scene key="practiceassesment" component={PracticeAssesment} />
        <Scene key="practicesummary" component={PracticeSummary} />
        <Scene key="practicesolutions" component={PracticeSolutions} />
        <Scene key="practicereview" component={PracticeReview} />

        <Scene key="objectassesment" component={ObjectAssesment} />
        <Scene key="pdfview" component={PdfViewNew} />
        <Scene key="referview" component={ReferView} />
        <Scene key="changepassword" component={ChangePassword} />
        <Scene key="contactus" component={ContactUs} />
        <Scene key="notifications" component={Notifications} />
        <Scene key='profile' component={Profile} />
        <Scene key="editprofile" component={EditProfile} />
        <Scene key="analysis" component={Analysis} />
        <Scene key="games" component={Games} />
        <Scene key="settings" component={Settings} />
        <Scene key="announcements" component={Announcements} />
        <Scene key="leaderboard" component={LeaderBoard} />
      </Stack>
    </Router>
  )
}

export default App
