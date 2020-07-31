import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class QuizItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item,
            score: ''
        }
    }
    render() {
        return (<tr><td className="collection-item"> {this.state.item.name}</td>
            <td><Link to={`/quiz/getQuizDetail/${this.state.item.id}`}>
                Attempt </Link></td>
        </tr>);
    }

}

export default QuizItem;
