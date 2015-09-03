var Answer = function(quizId, index, answer, isCorrect) {
    this.quizId = quizId;
    this.index = index;
    this.answer = answer;
    this.isCorrect = isCorrect;
};

Answer.load = function(obj) {
    if (typeof obj              === 'undefined' ||
        typeof obj.quizId       === 'undefined' ||
        typeof obj.index        === 'undefined' ||
        typeof obj.answer       === 'undefined' ||
        typeof obj.isCorrect    === 'undefined'
    ) {
        throw new Error('Incorrect data to load:' + JSON.stringify(obj));
    }
    return new Answer(obj.quizId, obj.index, obj.answer, obj.isCorrect);
};

exports.Answer = Answer;
