var Question = require('model/question').Question;

var Quiz = function(title, questions) {
    this.title = title;
    this.questions = questions;
};

Quiz.load = function(obj) {
    var questions = [];
    if (obj.questions) {
        for (var i = 0; i < obj.questions.length; i++) {
            questions.push(Question.load(obj.questions[i]));
        }
    }
    return new Quiz(obj.title, questions);
};

exports.Quiz = Quiz;
