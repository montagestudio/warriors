var Run = function(id, correctCount, wrongCount, duration, finished) {
    this.id = id;
    this.correctCount = correctCount;
    this.wrongCount = wrongCount;
    this.duration = duration;
    this.finished = !!finished;
};

Run.load = function(obj) {
    return new Run(obj.id, obj.correctCount, obj.wrongCount, obj.duration, obj.finished);
};

exports.Run = Run;
