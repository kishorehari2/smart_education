import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            questions: '',
            address: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        this.getMeetupDetails();
    }

    getMeetupDetails() {
        let meetupId = this.props.match.params.id;
        axios.get(`/api/quizzes/${meetupId}`).then(response => {
            this.setState(
                {
                    id: response.data.id,
                    name: response.data.name,
                    questions: response.data.questions,
                    address: response.data.address

                }, () => {

                });
        })
    }

    editMeetup(newMeetup) {
        axios.request({
            method: 'put',
            url: `/api/quizzes/${this.state.id}`,
            data: newMeetup
        }).then(response => {
            this.props.history.push('/');
        }).catch(err => console.log(err));
    }

    onSubmit(e) {
        const newMeetup = {
            id: this.state.id,
            name: this.refs.name.value,
            city: this.refs.city.value,
            address: this.refs.address.value
        }
        this.editMeetup(newMeetup);
        e.preventDefault();
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <Link className="btn grey" to="/teacher">Back</Link>

                <h1>Edit Meetup</h1>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="input-field">
                        <input type="text" name="name" ref="name" value={this.state.name}
                            onChange={this.handleInputChange} />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="city" ref="city" value={this.state.city}
                            onChange={this.handleInputChange} />
                        <label htmlFor="city">City</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="address" ref="address" value={this.state.address}
                            onChange={this.handleInputChange} />
                        <label htmlFor="adress">Adress</label>
                    </div>
                    <input type="submit" value="Save" className="btn" />

                </form>
            </div>
        );
    }

}

export default EditQuiz;
