import axios from 'axios';
export default (async function showResults(values) {
  axios.request({
    method: 'post',
    url: '/api/quizzes/',
    data: values
  }).then(response => {
    var lang = response.data.id;
    localStorage.setItem('mcqId', lang);
    alert('MCQ Quiz added successfully!!')
    window.opener = null;
    window.open("", "_self");
    window.close();
  }).catch(err => console.log(err));


});

