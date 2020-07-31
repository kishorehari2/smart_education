import axios from 'axios';
//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export default (async function showResults(values) {

    var mcqID = values['id'];
    delete values['id'];
    axios.request({
        method: 'post',
        url: '/api/voice/',
        data: values
    }).then(response => {
        var voiceID = response.data.id
        localStorage.setItem('voiceId', voiceID);
        alert('Voice Quiz added successfully!!')
        window.opener = null;
        window.open("", "_self");
        window.close();
    }).catch(err => console.log(err));
});

