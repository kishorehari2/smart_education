import React, { Component } from "react";
import { Provider } from "react-redux";
import { Values } from "redux-form-website-template";
import FieldArraysForm from "./FieldArraysForm";
import showResults from "./showResults";
import store from "./store";

class Indexer extends Component {

  render() {

    return (
      <Provider store={store}>
        <div style={{ padding: 15 }}>
          <h2>Add Assessment</h2>
          <FieldArraysForm onSubmit={showResults} />

      
        </div>
      </Provider>
    )
  }
};
export default Indexer;
