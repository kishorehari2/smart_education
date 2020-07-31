import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Teacher extends Component {


  render() {

    return (
      <div>
        <h1>Welcome </h1>
        <h2>Please choose any of the below to continue</h2>
        <div class="row">
          <div class="col s12 m6">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">Assessment Form</span>
                <p>This section allows you to create assessment using form. You will be asked
                to enter the questions and details for each question. You can add objective and oral questions here.
            </p>
              </div>
              <div class="card-action">

                <Link className="btn grey" to="/quiz/addAssessment">Start</Link>

              </div>
            </div>
          </div>
          <div class="col s12 m6">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">Assessment Template</span>
                <p>This section allows you to add an assesment based on an excel template. You can add objective and oral questions in this section
                based on the sample template available.
                </p>
              </div>
              <div class="card-action">

                <Link className="btn grey" to="/quiz/addAssessmentTemplate">Start</Link>

              </div>
            </div>
          </div>
        </div>



      </div>
    )
  }
}

export default Teacher;
