var Option = require('./option').Option;

var Question = function(title, options, answer) {
    this.title = title;
    this.options = options;
    this.answer = answer;
};

Question.load = function(obj) {
    var options = [];
    if (obj.options) {
        for (var i = 0; i < obj.options.length; i++) {
            options.push(Option.load(obj.options[i]));
        }
    }
    return new Question(obj.title, options, obj.answer);
};

exports.Question = Question;
