import React from 'react';
import './Question.css';

const Question = (props) => {
    return (
        <h1 className="blue-text text-darken-2">{props.question.question}</h1>
    );
}

export default Question;
