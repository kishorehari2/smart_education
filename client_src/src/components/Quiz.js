import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QuizItem from './QuizItem';
class Quiz extends Component {
    constructor() {
        super();
        this.state = {
            quiz: []
        }
          
    }
    componentWillMount() {
        this.getMCQQuizzes();
       
    }
    getMCQQuizzes() {

        axios.get('/api/quizzes/').then(response => {

            this.setState({ quiz: response.data }, () => {
            });
        })
    }
 
    render() {
        const quizItems = this.state.quiz.map((tempQuiz, i) => {
            return (<QuizItem key={tempQuiz.id}
                item={tempQuiz} />
            )
        })

        return (
            <div >

                <h1>Assessment</h1>

                <table id="quiz">
                    <thead>
                        <tr>
                            <th>Assessment</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {quizItems}
                    </tbody>
                </table>
                <div className="fixed-action-btn">
                    <Link to='quiz/addAssessment' className="btn-floating btn-large red"><i className="fa fa-plus"></i></Link>
                </div>
            </div>
        )
    }
}

export default Quiz;
