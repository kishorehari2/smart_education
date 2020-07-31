import React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../App.css';
import Indexer from './array/indexer';
import Assessment from './Assessment';
import ExcelReader from './ExcelReader';
import FinalQuizAdd from './FinalQuizAdd';
import FinalQuizDetails from './FinalQuizDetails';
import QuizDetails from './QuizDetails';
import Teacher from './Teacher';
import VoiceIndexer from './voice/indexer';
import Demo from './voice/views/demo';
import VoiceAssessment from './voice/VoiceAssessment';
import VoiceQuizDetails from './voice/VoiceQuizDetails';
const Main = () => (
    <main>
        <Switch >
            <Route exact path='/home' component={Assessment} />
            <Route exact path='/mcq/addAssessment' component={Indexer} />
            <Route exact path='/voice/showAssessments' component={VoiceAssessment} />
            <Route exact path='/voice/takeAssessment/:id' component={Demo} />
            <Route exact path='/assessment' component={Demo} />
            <Route exact path='/voice/addAssessment' component={VoiceIndexer} />
            <Route exact path='/quiz/addAssessmentTemplate' component={ExcelReader} />

            <Route exact path='/voice/showAssessment/:id' component={VoiceQuizDetails} />
            <Route exact path='/quiz/getQuizDetail/:id' component={QuizDetails} />
            <Route exact path='/quiz/getQuiz/:id' component={FinalQuizDetails} />
            <Route exact path='/quiz/takeAssessment' component={Assessment} />
            <Route exact path='/quiz/addAssessment' component={FinalQuizAdd} />
            <Route exact path='/teacher' component={Teacher} />

        </Switch>

    </main>
)

export default Main
