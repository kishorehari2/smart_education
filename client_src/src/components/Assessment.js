import axios from 'axios';
import React, { Component } from 'react';
import FinalQuizItem from './FinalQuizItem';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
class Assessment extends Component {
    constructor() {
        super();
        this.state = {
            quiz: [],
            mcq: [],
            showLoader: true,
            errorMsg: ''
        }
    }
    componentWillMount() {
        this.getAssessments();
        //  this.test();
    }

    async getAssessments() {
        await sleep(700);

        axios.get('/api/final/').then(response => {
            this.setState({ quiz: response.data }, () => {

            });
        }).catch(function (error) {
            error = "Error in Connection, please refresh";
        })
        let id = this.state.quiz;
        this.setState({
            showLoader: false,

        })

    }
    render() {
        const meetupItems = this.state.quiz.map((meetup, i) => {
           
            return (<FinalQuizItem key={meetup.mcqID}
                item={meetup} />)
        })


        return (
            <div >
                <h1>Pending Assessments</h1>
                <div id="camera" style={{ display: "none" }}  ></div>
                <input type="button" id="btPic" value="click" style={{ display: "none" }} onClick={this.takeSnapShot} />

                {this.state.showLoader && <div id="loader" className="container1"></div>}
                {!this.state.showLoader && < div className="Content" >
                    <br></br>
                    {meetupItems.length === 0 ? <h4 className="green-text">{this.state.errorMsg}</h4> :

                        <table id="quiz">
                            <thead>
                                <tr>
                                    <th>Assessment</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {meetupItems}
                            </tbody>
                        </table>
                    }
                </div>}

            </div>
        )
    }
}

export default Assessment;
