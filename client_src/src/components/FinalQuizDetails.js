import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Webcam from 'webcamjs';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class FinalQuizDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item,
            mcqID: '',
            voiceID: '',
            btn: '',
            btn1: '',
            seconds: 10,
            startQuiz: true,
            minutes: 0,
            picInterval: 0,

        }
        this.onClick = this.onClick.bind(this);
        this.onClick1 = this.onClick1.bind(this);

        this.takeSnapShot = this.takeSnapShot.bind(this);
        //this.test = this.test.bind(this);
    }
    componentWillUnmount() {
        //clearInterval(this.picInterval)
    }
    componentDidMount() {
        this.getAssessments();
        this.setTime();
        Webcam.set({
            width: 220,
            height: 190,
            image_format: 'png',
            jpeg_quality: 100
        });
        Webcam.attach('#camera');
        this.takeSnapShot();
        //this.takeSnapShot(),10000;


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
                    this.setState({
                        startQuiz: false
                    })
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
    getAssessments() {
        let quizId = this.props.match.params.id;
        axios.get(`/api/final/${quizId}`).then(response => {

            this.setState({ mcqID: response.data.mcqID, voiceID: response.data.voiceID }, () => {

            });
        })
    }
    onClick() {
        this.btn.setAttribute("disabled", "disabled");
    }
    onClick1() {
        this.btn1.setAttribute("disabled", "disabled");
    }
    async takeSnapShot() {
        console.log('inside takeSNap()')
        this.picInterval = setInterval(() => {
            document.querySelector('#btPic').click();
            var data;

            Webcam.snap(function (data_uri) {
                data = data_uri;
                const temp = data.substring(22);
                const attach = { "anu.png": { 'data': temp } };
                axios.request({
                    method: 'post',
                    url: '/api/images/',
                    data: {
                        file_name: "anu",

                        _attachments: attach

                    }
                }).then(response => {
                    const id = response.data.id;
                    axios.get('/name?id=' + id).then(response => {
                        var data = response.data;
                        var c = data.indexOf("confidence:");
                        var l = data.indexOf("&label:")
                        var confidence = data.substring(11, (l - 1))
                        var label = data.substring((l + 7));
                        if (confidence < 50) {
                            alert('Authentication Failed. You will be logged out')
                            window.location.replace("/")
                        }
                        console.log(confidence)
                        console.log(label)
                    }).catch(function (error) {
                        console.log('error')
                        console.log(error)
                    });

                }).catch(err => console.log(err));

            });
            // this.downloadImage(data)
        }, 20000);

        // this.downloadImage(data)

    }
    render() {
        const { voiceID, seconds } = this.state
        return (
            <div>
                <div id="camera" style={{ display: "none" }}  ></div>
                <input type="button" id="btPic" value="click" style={{ display: "none" }} onClick={this.takeSnapShot} />

                <h1>Assessment Instructions</h1>
                <ul>
                    <li>This assessment consists of two sections - MCQ and Oral</li>
                    <li>Click on Start Assessment when you are ready to begin</li>
                    <li>You need to provide camera and microphone permissions to the application to complete the assessment
                </li>
                    <li>The application will capture your random photos for verification. These images will be deleted after the attempt is complete</li>
                    <li>If your assessment has a oral section, click on the Start Recording Button to record your answer. Once you finish your answer, clock Stop recording</li>
                    <li>Once you press Stop recording, the application will play the recorded answer. if you wish to re-record your answer, follow the above steps again.</li>
                </ul>
                <br></br>
                {this.state.mcqID !== undefined ? <Link ref={btn => { this.btn = btn; }} className="btn" onClick={this.onClick} to={{
                    pathname: `/quiz/getQuizDetail/${this.state.mcqID}`,
                    state: {
                        voiceID: voiceID
                    }
                }} style={{ float: "right" }} disabled={this.state.startQuiz} >
                    {seconds != 0 ? seconds + " seconds to Start" : "Start Assessment"}</Link> :
                    <Link ref={btn => { this.btn = btn; }} className="btn" to={{
                        pathname: `/voice/showAssessment/${this.state.voiceID}`
                    }} style={{ float: "right" }}  disabled={this.state.startQuiz} >
                         {seconds != 0 ? seconds + " seconds to Start" : "Start Assessment"} </Link>
                }


            </div>
        );
    }

}

export default FinalQuizDetails;
