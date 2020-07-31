import axios from 'axios';
import React, { Component } from 'react';
import Demo from './views/demo.jsx';
class VoiceQuizDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keywords: '',
            correctAnswers: '',
            correctAnswer: 0,
            clickedAnswer: 0,
            step: 0,
            score: 0,
            details: [],
            questions: [{ "question": "", "answers": [], "correct_answer": "", "id": 2 }],
            question: '',
            check: 1,
            length: '',
            showLoader: true,
            minutes: '',
            seconds: 1,
            progress: false
        }
        this.handleTranscription = this.handleTranscription.bind(this)
    }

    componentDidMount() {
        this.getQuiz();
        this.setTime();
        sessionStorage.removeItem('score');
    }
    setTime() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }

    getQuiz() {
        let quizId = this.props.match.params.id;
        axios.get(`/api/voice/${quizId}`).then(response => {
            this.setState({
                details: response.data,
                quiestions: this.state.details.questions,
                questions: response.data.questions,
                question: this.state.questions.question,
                length: response.data.questions.length,
                check: 0,
                minutes: Math.floor(((response.data.questions.length) * 120) / 60),
                seconds: ((response.data.questions.length) * 120) % 60,
            }, () => {
                this.setQuestion();
            });
        })


    }
    handleTranscription(langValue) {
        this.setState({ progress: langValue });
    }

    setQuestion() {
        this.setState({
            question: this.state.questions[this.state.step].question,
            correctAnswers: this.state.questions[this.state.step].correct_answer - 1
        });
        this.setState({
            showLoader: false
        })
    }


    getMeetup() {
        let quizId = this.props.match.params.id;
        axios.get(`/api/voice/${quizId}`).then(response => {
            this.setState({ details: response.data, questions: response.data.questions }, () => {
                
            });
        })
    }
    checkAnswer = answer => {
        const { correctAnswers, step, score } = this.state;
        this.state.correctAnswers = this.state.questions[step].correct_answer - 1;
        if (answer === this.state.correctAnswers) {
            this.setState({
                score: score + 1,
                correctAnswer: correctAnswers,
                clickedAnswer: answer
            });
        } else {
            this.setState({
                correctAnswer: 0,
                clickedAnswer: answer
            });
        }
    }

    nextStep = (step) => {
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0,
            progress: false

        });
        const sum = sessionStorage.getItem('sum');
        const score = sessionStorage.getItem('score');
        if (!isNaN(sum) && !isNaN(score))
            sessionStorage.setItem('score', Number(sum) + Number(score))
        sessionStorage.setItem('sum',0);

        }

    render() {
        let { questions, step, score, minutes, seconds, showLoader } = this.state;
        return (
            <div className="Content">
                <div id="camera" style={{ display: "none" }}  ></div>
                <input type="button" id="btPic" value="click" style={{ display: "none" }} onClick={this.takeSnapShot} />

                <h1 className="blue-text text-darken-2">Oral Assessment</h1>
                <h1 className="blue-text text-darken-2">{this.state.details.name}</h1>
                {showLoader && <div id="loader" className="container1"></div>}
                {!showLoader && < div className="Content" >
                    {step < Object.keys(questions).length ?
                        (<>
                            <div id="hud">
                                <div id="hud-item">
                                    <p id="progressText" className="hud-prefix">
                                        Question {step + 1}/{this.state.length}
                                    </p>

                                    <div id="progressBar">
                                        <div id="progressBarFull" style={{ width: (step + 1) / this.state.length * 100 + "%" }}></div>
                                    </div>
                                </div>
                                <div id="hud-item">
                                    <p className="hud-prefix">
                                        Score
            </p>
                                    <h1 className="hud-main-text green-text" id="score" >
                                        {sessionStorage.getItem('score') === null ? 0 : sessionStorage.getItem('score')}
                                    </h1>
                                </div>
                            </div>
                            <br></br>
                            {minutes === 0 && seconds < 10
                                ? <h4 align="right" className="red-text text-darken-2"><i className="fa fa-hourglass-half">Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</i></h4>
                                : <h4 align="right" className="blue-text text-darken-2"><i className="fa fa-hourglass-half">Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</i></h4>
                            }
                            <Demo datal={this.state.questions[step]}
                                clickedAnswer={this.state.clickedAnswer}
                                onTranscribe={this.handleTranscription} />
                            <button
                                className="NextStep"
                                disabled={this.state.progress}
                                onClick={() => this.nextStep(step)

                                }>Next</button>
                        </>) : (
                            <div className="finalPage">
                                {minutes === 0 && seconds === 0 ? <h1>Time Up!</h1>
                                    :
                                    <h1>You have completed the quiz!</h1>}
                                <h1>Your score is: {Math.round(sessionStorage.getItem('score') * 100) / 100} of {Object.keys(questions).length}</h1>
                                <h1>Thank you!</h1>
                               

                                <br></br>
                                <a className="btn" href="/home" >
                                    HOME   </a>
                            </div>
                        )
                    }
                </div>}
            </div>

        );
    }

}

export default VoiceQuizDetails;
