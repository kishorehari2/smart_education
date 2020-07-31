import React, { Component } from "react";
import { Provider } from "react-redux";
import FieldArraysForm from "./FieldArraysForm";
import showResults from "./showResults";
import store from "./store";



class VoiceIndexer extends Component {
  render() {
    var url = document.URL;
    var id = url.substring(url.lastIndexOf('=') + 1);
    return (
      <Provider store={store}>
        <div style={{ padding: 15 }}>
          <h2>Add Voice Assessment</h2>
          <FieldArraysForm initialValues={{ id }} onSubmit={showResults} />
        
        </div>
      </Provider>
    )
  }
};
export default VoiceIndexer;
