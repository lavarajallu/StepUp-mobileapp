/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { Login,ViewSolutions,Practice,PrePaperReview,MockTestReview,MockTestPapers,MockTestSolutions,
    MockTestAssesment,MockTestSummary,MockTest,PrePaperSummary,Register,PrePaperSolutions,
     ForgotPassword,TopicMainView,PrePaperAssesment,PreQuestionPapers,ReviewPostSummary, 
     Otp, Boards,PreviousPapers,Grades,Dashboard,Chapters,Topics,PostSummary,PostAssesment,
     PreAssesment,PreSummary,TopicInDetails,WebLinkView, PracticeChapter,PracticeAssesment,PracticeSummary,
 PracticeSolutions,PracticeReview,VideoView,ObjectAssesment,Main,PdfView} from './src/containers'

const App = () => {
  return (
    <Router>
      <Stack key="root" hideNavBar={true}>
         <Scene key="main" component={Main} />
        <Scene key="login" component={Login}    initial={true}/>
        <Scene key="register" component={Register} />
        <Scene key="forgotPassword" component={ForgotPassword}  />
        <Scene key="otp" component={Otp}/>
        <Scene key="boards" component={Boards}  />
        <Scene key="grades" component={Grades} />
       
        <Scene key="dashboard" component={Dashboard} />
        <Scene key="chapters" component={Chapters} />
        <Scene key="topics" component={Topics} />
        <Scene key = "preassesment" component ={PreAssesment} />
        <Scene key = "presummary" component={PreSummary} />
        <Scene key= "topicindetails" component={TopicInDetails} />
        <Scene key="videoview" component={VideoView}  />
        <Scene key ="weblinkview" component={WebLinkView} />
        <Scene key = "postassesment" component={PostAssesment} />
        <Scene key = "postsummary" component={PostSummary}/>
        <Scene key="viewsolutions" component={ViewSolutions} />
        <Scene key="topicmainview" component={TopicMainView}   />
        <Scene key = "previouspapers" component={PreviousPapers}  />
        <Scene key ="prequestionpapers" component={PreQuestionPapers}   />
        <Scene key="reviewpostsummary" component={ReviewPostSummary}/>
        <Scene key = 'prepaperassesment' component={PrePaperAssesment}  />
        <Scene key="prepapersummary" component ={PrePaperSummary} />
        <Scene key = "prepapersolutions" component ={PrePaperSolutions}  />
        <Scene key = "prepaperreview" component={PrePaperReview} />
        <Scene key = "mocktest" component={MockTest}  />
        <Scene key="mocktestpapers" component={MockTestPapers}/>
        <Scene key="mocktestassesment" component={MockTestAssesment}/>
        <Scene key="mocktestsummary" component={MockTestSummary}/>
        <Scene key ="mocktestsolutions" component={MockTestSolutions} />
        <Scene key="mocktestreview" component={MockTestReview} />

        <Scene key="practice" component={Practice}/>
        <Scene key="practicechapter" component={PracticeChapter}  />
        <Scene key="practiceassesment" component={PracticeAssesment}/>
        <Scene key="practicesummary" component={PracticeSummary}/>
        <Scene key="practicesolutions" component={PracticeSolutions}/>
        <Scene key="practicereview" component ={PracticeReview} />

        <Scene key="objectassesment" component={ObjectAssesment}  />
        <Scene key="pdfview" component={PdfView}/>
      </Stack>
    </Router>
  )
}

export default App
