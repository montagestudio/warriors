var Answer = function(runId, question, answer, isCorrect) {
    this.runId = runId;
    this.question = question;
    this.answer = answer;
    this.isCorrect = isCorrect;
};

Answer.load = function(obj) {
    if (typeof obj              === 'undefined' ||
        typeof obj.runId        === 'undefined' ||
        typeof obj.question     === 'undefined' ||
        typeof obj.answer       === 'undefined' ||
        typeof obj.isCorrect    === 'undefined'
    ) {
        throw new Error('Incorrect data to load:' + JSON.stringify(obj));
    }
    return new Answer(obj.runId, obj.question, obj.answer, obj.isCorrect);
};

exports.Answer = Answer;
