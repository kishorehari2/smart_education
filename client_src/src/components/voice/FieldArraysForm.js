import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
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
          className=""
          style={{ height: "20px" }}
        />
        <Field
          name={`${question}.keywords`}
          type="text"
          component={renderField}
          label="Keywords"
        />


      </li>
    ))}
  </ul>
);

const FieldArraysForm1 = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

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
})(FieldArraysForm1);
