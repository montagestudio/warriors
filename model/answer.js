var Answer = function(quizId, index, answer, isCorrect) {
    this.quizId = quizId;
    this.index = index;
    this.answer = answer;
    this.isCorrect = isCorrect;
};

Answer.load = function(obj) {
    return new Answer(obj.quizId, obj.index, obj.answer, obj.isCorrect);
};

exports.Answer = Answer;
