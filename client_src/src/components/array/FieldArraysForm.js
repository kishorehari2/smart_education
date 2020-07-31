import axios from 'axios';
import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate';




const getCount = (id) => (
  axios.get(`/api/quizzes/count`).then(response => {
    id = response.data.count;
    return id;
  })
);
const renderCount = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input type="hidden" value={Math.floor(Math.random() * 100) + 1} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);


const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);


const renderAnswers = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Option</button>
    </li>
    {fields.map((answers, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Option"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={answers}
          type="text"
          component={renderField}
          label={`Option #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);

const renderQuestions = ({ fields, meta: { touched, error, submitFailed } }) => (

  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>Add Question</button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {fields.map((question, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Question"
          onClick={() => fields.remove(index)}
        />
        <h4>Question #{index + 1}</h4>
        <Field
          name={`${question}.question`}
          type="text"
          component={renderField}
          label="Question"
        />
        <Field
          name={`${question}.correct_answer`}
          type="text"
          component={renderField}
          label="Correct Answer Option"
        />
        <Field type="hidden" name={`${question}.id`} component={renderCount} />
        <FieldArray name={`${question}.answers`} component={renderAnswers} />
      </li>
    ))}

  </ul>

);

const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  //this.props.change(id, getCount)
  getCount();
  return (
    <form onSubmit={handleSubmit}>

      <Field
        name="name"
        type="text"
        component={renderField}
        label="Quiz Name"
      />
      <FieldArray name="questions" component={renderQuestions} />
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  validate,
})(FieldArraysForm);
