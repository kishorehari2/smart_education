import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Webcam from 'webcamjs';
import Answer from './answer/Answer';
import Question from './question/Question';
import './QuizMain.css';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default class QuizDetails extends Component {
    constructor(props) {
        super(props);
         }
    state = {
        quiestions: {},
        totalTime: '',
        answers: {
            "answers": [
            ]
        },
        correctAnswers: '',
        correctAnswer: 0,
        clickedAnswer: 0,
        step: 0,
        score: 0,
        details: [],
        questions: [{}],
        question: '',
        minutes: '',
        seconds: 1,
        showLoader: true,
        length: '',
        voiceID: '',
        picInterval: 0,
        database: ''
    }
    componentDidMount() {
        this.getQuiz();
        this.setTime();
        if (this.props.location.state !== undefined)
            this.setState({
                voiceID: this.props.location.state.voiceID
            })
        Webcam.set({
            width: 220,
            height: 190,
            image_format: 'png',
            jpeg_quality: 100
        });
        Webcam.attach('#camera');
    }
    
    componentWillUnmount() {
        clearInterval(this.myInterval)
        clearInterval(this.picInterval)
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
    async getQuiz() {
        await sleep(700);
        let quizId = this.props.match.params.id;
        axios.get(`/api/quizzes/${quizId}`).then(response => {
            this.setState({
                details: response.data,
                quiestions: this.state.details.questions,
                questions: response.data.questions,
                question: this.state.questions.question,
                totalTime: (response.data.questions.length) * 30,
                minutes: Math.floor(((response.data.questions.length) * 30) / 60),
                seconds: ((response.data.questions.length) * 30) % 60,
                length: response.data.questions.length
            }, () => {
                this.setQuestion();
            });
        })


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

    checkAnswer = answer => {
        const { correctAnswers, step, score } = this.state;
        this.state.correctAnswers = this.state.questions[step].correct_answer - 1;
        if (answer == this.state.correctAnswers) {
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

    // method to move to the next question
    nextStep = (step) => {
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0,

        });

    }

      
    render() {
        let { correctAnswer, questions, clickedAnswer, step, score, minutes, seconds, showLoader } = this.state;
        return (
            <Fragment>
                <div id="camera" style={{ display: "none" }}  ></div>
                <input type="button" id="btPic" value="click" style={{ display: "none" }} onClick={this.takeSnapShot} />
                {this.state.showLoader && <div id="loader" className="container1"></div>}
                {!this.state.showLoader && < div className="Content" >
                    <br></br>
                    <h1 className="blue-text text-darken-2">{this.state.details.name}</h1>
                    <hr></hr>
                    {
                        step < Object.keys(questions).length && !(minutes == 0 && seconds == 0) && !showLoader ?
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
                                            {this.state.score}
                                        </h1>
                                    </div>
                                </div>
                                <Question
                                    question={questions[step]}
                                    step={step}
                                />
                                {minutes === 0 && seconds < 10
                                    ? <h4 align="right" className="red-text text-darken-2"><i className="fa fa-hourglass-half">Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</i></h4>
                                    : <h4 align="right" className="blue-text text-darken-2"><i className="fa fa-hourglass-half">Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</i></h4>
                                }
                                <Answer
                                    answer={questions[step]}
                                    step={step}
                                    checkAnswer={this.checkAnswer}
                                    correctAnswer={correctAnswer}
                                    clickedAnswer={clickedAnswer}
                                    test={minutes === 0 && seconds === 0 ? 'disabled' : ''}
                                />
                                <button
                                    className="NextStep"
                                    disabled={
                                        (clickedAnswer && Object.keys(questions).length >= step)
                                            || (minutes === 0 && seconds === 0)
                                            ? false : true
                                    }
                                    onClick={() => this.nextStep(step)}>Next</button>
                            </>) : (


                                <div className="finalPage">

                                    {minutes === 0 && seconds === 0 ? <h1>Time Up!</h1>
                                        : <h1>You have completed the quiz!</h1>}
                                    <h1>Your score is: {score} of {Object.keys(questions).length}</h1>
                                    <h1>Thank you!</h1>


                                    <br></br>


                                    <br></br>
                                    {this.state.voiceID !== '' && this.state.voiceID !== undefined ?
                                        <Link ref={btn1 => { this.btn1 = btn1; }} className="btn" to={`/voice/showAssessment/${this.state.voiceID}`}  >
                                            PROCEED TO NEXT SECTION - VOICE   </Link> :
                                        <Link className="btn" to={`/home`} >
                                            HOME   </Link>}

                                </div>

                            )
                    }
                </div >}
            </Fragment>
        );
    }
}
