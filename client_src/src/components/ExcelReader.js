import axios from 'axios';
import { Label } from 'office-ui-fabric-react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const SheetJSFT = [
  "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function (x) { return "." + x; }).join(",");

class ExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
      newData: [],
      name: '',
      finalData: [],
      voicedata: [],
      finalVoiceData: [],
      newVoiceData: []
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount(){
    localStorage.removeItem('mcqId');
    localStorage.removeItem('voiceId')
  }

  addMCQQuiz(values) {
    axios.request({
      method: 'post',
      url: '/api/quizzes/',
      data: values
    }).then(response => {
      var lang = response.data.id;
      localStorage.setItem('mcqId', lang);
    }).catch(err => console.log(err));
  }

  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  };

  handleFile() {
    if (this.state.file.name === undefined) {
      document.getElementById("error").innerHTML = "Please upload file"
      return;
    }
    if (this.state.name.length === 0) {

      document.getElementById("error").innerHTML = "Name is mandatory"
      return;
    }
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
      const ws = wb.Sheets["mcq"];
      if (ws != null) {
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws);
        /* Update state */
        this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
          var temp = this.state.data;
          const len = temp.length;
          for (var i = 0; i < len; i++) {

            this.state.data[i].answers = [this.state.data[i].Option1, this.state.data[i].Option2, this.state.data[i].Option3, this.state.data[i].Option4];
            this.state.newData[i] = {
              "question": this.state.data[i].question,
              "answers": this.state.data[i].answers,
              "correct_answer": this.state.data[i].correct_answer
            }

          }
          this.state.finalData = {
            "name": this.state.name,
            "questions": this.state.newData
          }
          this.addMCQQuiz(this.state.finalData);
        });
      }
      const wsvoice = wb.Sheets["voice"];
      if (wsvoice != null) {
        /* Convert array of arrays */
        const voicedata = XLSX.utils.sheet_to_json(wsvoice);
        /* Update state */
        this.setState({ voicedata: voicedata, cols: make_cols(wsvoice['!ref']) }, () => {
          var temp = this.state.voicedata;
          const len = temp.length;
          alert(this.state.cols)
          for (var i = 0; i < len; i++) {
            //this.state.data[i].answers=[this.state.data[i].Option1,this.state.data[i].Option2,this.state.data[i].Option3,this.state.data[i].Option4];
            this.state.newVoiceData[i] = {
              "question": this.state.voicedata[i].question,

              "keywords": this.state.voicedata[i].keywords
            }
          }
          this.state.finalVoiceData = {
            "name": this.state.name,
            "questions": this.state.newVoiceData
          }
          this.addVoiceQuiz(this.state.finalVoiceData)

        });
      }
      this.addFinalQuiz();

    };

    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };
  }
  handleInputChange(e) {

    const target = e.target;
    const value = target.value;
    this.setState({
      name: value
    })
  }
  async addFinalQuiz() {
    await sleep(700)
    var finalQuiz = {
      "name": this.state.name, "mcqID": localStorage.getItem('mcqId'),
      "voiceID": localStorage.getItem('voiceId')
    }
    if (localStorage.getItem('voiceId') == null) {
      delete finalQuiz['voiceID'];
    }
    if (localStorage.getItem('mcqId') == null) {
      delete finalQuiz['mcqID'];
    }
    axios.request({
      method: 'post',
      url: '/api/final/',
      data: finalQuiz
    }).then(response => {
      localStorage.removeItem('mcqId')
      localStorage.removeItem('voiceId')
      window.location.replace("/teacher");
    }).catch(err => console.log(err));
  }

  addVoiceQuiz(values) {
    axios.request({
      method: 'post',
      url: '/api/voice/',
      data: values
    }).then(response => {
      var voiceID = response.data.id
      localStorage.setItem('voiceId', voiceID);

    }).catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1 color="blue">MCQ Template Upload</h1>
        <hr />
        <p>
          You can upload your template of quiz following below steps.
        </p>

        <b color="blue"><u>Instructions</u></b>
        <ul>
          <li>
            <Link to="/files/test.xlsx" target="_blank" download="Template.xlsx">Download </Link>
                   the template attached here.</li>
          <li>Fill in your question , options and correct answer</li>
          <li>Do not modify the order of columns</li>
          <li>If you need to remove number of options, delete the corresponding columns from the template before uploading</li>
          <li>Do not rename the worksheet names while uploading</li>
        </ul>

        <Label htmlFor="name">Quiz Name</Label>
        <input type="text" id="name" ref="name" onChange={this.handleInputChange}></input>
        <span id="error" className="red-text"></span>
        <br></br>

        <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />

        <br />
        <br></br>
        <input type='submit'
          className="btn"
          value="Upload Quiz"
          onClick={this.handleFile} />
        <div className="fixed-action-btn">
          <a className="btn-floating btn-large red">
            <i className="large material-icons">navigation</i>
          </a>
          <ul>
            <li><a href="/quiz/addAssessment" title="Form" className="btn-floating green"><i className="material-icons">reorder</i></a></li>
            <li><a href="/teacher" title="Home" className="btn-floating red"><i className="material-icons">home</i></a></li>

          </ul>
        </div>
      </div>

    )
  }
}

export default ExcelReader;
