module.exports = function(VoiceQuiz){

    Person.greet = async function(msg) {
        return 'Greetings... ' + msg;
    }

    Person.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};