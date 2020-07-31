import axios from 'axios';
import React, { Component } from 'react';
import VoiceAssessmentItem from './VoiceAssessmentItem';
class VoiceAssessment extends Component {
    constructor() {
        super();
        this.state = {
            meetups: []
        }
    }
    componentWillMount() {

        this.getVoiceQuiz();
    }
    getVoiceQuiz() {

        axios.get('/api/voice/').then(response => {
            this.setState({ meetups: response.data }, () => {
            });
        })
    }
    render() {
        const meetupItems = this.state.meetups.map((meetup, i) => {
            return (<VoiceAssessmentItem key={meetup.id}
                item={meetup} />)
        })

        return (
            <div>
                <h1>Voice Assessment</h1>
                <ul className="collection">
                    {meetupItems}
                </ul>
            </div>
        )
    }
}

export default VoiceAssessment;
