import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class FinalQuizAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item,
            mcqID: '',
            voiceID: '',
            name: '',
            proceed: true

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addFinalQuiz = this.addFinalQuiz.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onClick1 = this.onClick1.bind(this);

    }
    handleInputChange(e) {

        const target = e.target;
        const value = target.value;
        //const name=target.name;

        this.setState({
            name: value
        })
    }
    onClick() {
        this.btn.setAttribute("disabled", "disabled");
        this.setState({
            proceed: false
        })
    }
    onClick1() {
        this.btn1.setAttribute("disabled", "disabled");
        this.setState({
            proceed: false
        })
    }
    addFinalQuiz() {
        if (this.state.name.length === 0) {

            document.getElementById("error").innerHTML = "Name is mandatory"
            return;
        }
        var finalQuiz = {
            "name": this.state.name,
            "mcqID": localStorage.getItem('mcqId'),
            "voiceID": localStorage.getItem('voiceId')
        }
        if (localStorage.getItem('voiceId') == null) {
            delete finalQuiz['voiceID'];
        }
        if (localStorage.getItem('mcqId') == null) {
            delete finalQuiz['mcqID'];
        }

        axios.request({
            method: 'post',
            url: '/api/final/',
            data: finalQuiz
        }).then(response => {
            localStorage.removeItem('mcqId')
            localStorage.removeItem('voiceId')
            window.location.replace("/teacher");
        }).catch(err => console.log(err));
    }


    render() {

        return (
            <div>
                <h1>Add new Assessment - Instructions</h1>
                <ul>
                    <li><b>You can add both MCQ and voice sections to your Assessment</b></li>
                    <li><b>Click on the respective link to add the particular section </b></li>
                    <li><b>Clicking on each link will open a new window. Add the questions in the window and click submit to add the particular section quiz</b></li>
                    <li><b>After adding a section, click on the other link if you want to add both sections in your quiz</b></li>
                   <li><b>After adding the section, click on Proceed to add the final quiz.</b></li>
                     </ul>
                <label htmlFor="name">Quiz Name</label>
                <input type="text" required id="name" ref="name" onChange={this.handleInputChange}></input>
                <span id="error" className="red-text"></span>
                <br></br>
                <Link ref={btn => { this.btn = btn; }} onClick={this.onClick} className="btn" to={{
                    pathname: '/mcq/addAssessment',
                    state: {
                        name: this.state.name
                    }
                }} target="_blank" disabled={this.state.mcqID === undefined ? true : false} >
                    MCQ   </Link>

                <br></br>
                <br></br>
                <Link className="btn" ref={btn1 => { this.btn1 = btn1; }} onClick={this.onClick1} to='/voice/addAssessment' disabled={this.state.voiceID === undefined ? true : false} target="_blank"  >
                    VOICE   </Link>
                <br></br>

                <button className="btn" onClick={this.addFinalQuiz} disabled={this.state.proceed} >Proceed</button>





                <div className="fixed-action-btn">
                    <a className="btn-floating btn-large red">
                        <i className="large material-icons">navigation</i>
                    </a>
                    <ul>
                        <li><a href="/quiz/addAssessmentTemplate" title="Templates" className="btn-floating green"><i className="material-icons">publish</i></a></li>
                        <li><a href="/teacher" className="btn-floating red" title="Home"><i className="material-icons">home</i></a></li>

                    </ul>
                </div>
            </div>
        );
    }

}

export default FinalQuizAdd;
