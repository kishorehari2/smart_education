import React, { Fragment } from 'react';
import './Answer.css';

const Answer = (props) => {



    let answers = Object.keys(props.answer.answers)
        .map((qAnswer, i) => (
            <Fragment>

                <li
                    /* className=
                     {
                         props.answer.correct_answer === Number(qAnswer) + 1 ?
                             'correct' :
                             props.clickedAnswer === Number(qAnswer) + 1 ?
                                 'incorrect' : ''
                     }*/
                    onClick={() => {
                        props.checkAnswer(qAnswer)


                    }
                    }
                    key={qAnswer} >

                    {props.answer.answers[qAnswer]}
                </li >
            </Fragment>
        ));

    return (
        <>
            <ul disabled={props.clickedAnswer ? true : false} className="Answers">
                {answers}
            </ul>


        </>
    );
};
export default Answer;
