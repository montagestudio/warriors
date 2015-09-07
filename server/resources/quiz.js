var Answer = require('../model/answer').Answer,
    Quiz = require('../model/quiz').Quiz,
    Run = require('../model/run').Run;

function handlerDbError(error, request, reply) {
    console.log(error);
    var message = request.debug ? error.message : '';
    reply(message).code(500);
}

module.exports = [
    {
        method: 'GET',
        path: '/quiz',
        handler: function(request, reply) {
            var query = request.pg.client.query({
                text: "SELECT id, document->'title' AS title FROM quiz",
                name: 'list quiz'
            });
            query.on('row', function(row, result) {
                result.addRow(row);
            });
            query.on('end', function(result) {
                reply(result.rows);
            });
            query.on('error', function(error) {
                handlerDbError(error, request, reply);
            });
        }
    },
    {
        method: 'POST',
        path: '/quiz',
        handler: function(request, reply) {
            try {
                var quiz = Quiz.load(request.payload);
                var query = request.pg.client.query({
                    text: 'INSERT INTO quiz (id, document) VALUES (DEFAULT, $1) RETURNING id',
                    name: 'insert quiz',
                    values: [quiz]
                });
                query.on('row', function(row, result) {
                    result.addRow(row);
                });
                query.on('end', function(result) {
                    reply(result.rows[0].id).code(201);
                });
                query.on('error', function(error) {
                    handlerDbError(error, request, reply);
                });
            } catch (error) {
                handlerDbError(error, request, reply);
            }
        }
    },
    {
        method: 'GET',
        path: '/quiz/{id}',
        handler: function(request, reply) {
            var query = request.pg.client.query({
                text: 'SELECT document FROM quiz WHERE id = $1',
                name: 'quiz by id',
                values: [request.params.id] });
            query.on('row', function(row, result) {
                result.addRow(row);
            });
            query.on('end', function(result) {
                if (result.rowCount > 0) {
                    reply(result.rows[0].document);
                } else {
                    reply().code(404);
                }
            });
            query.on('error', function(error) {
                handlerDbError(error, request, reply);
            });
        }
    },
    {
        method: 'GET',
        path: '/quiz/{id}/answer',
        handler: function(request, reply) {
            var answers = [],
                query = request.pg.client.query({
                text:   'SELECT r.id AS run, a.question AS question, a.answer AS answer, a.correct AS correct ' +
                        'FROM answer AS a ' +
                        'LEFT OUTER JOIN run AS r ' +
                        '   ON a.run_id = r.id ' +
                        'WHERE r.quiz_id = $1',
                name: 'answers by quiz_id',
                values: [request.params.id]
            });
            query.on('row', function(row) {
                answers.push(new Answer(row.run, row.question, row.answer, row.correct));
            });
            query.on('end', function() {
                reply(answers);
            });
            query.on('error', function(error) {
                handlerDbError(error, request, reply);
            });
        }
    },
    {
        method: 'GET',
        path: '/quiz/{id}/answer/{index}',
        handler: function(request, reply) {
            var answers = [],
                query = request.pg.client.query({
                text:   'SELECT r.id AS run, a.question AS question, a.answer AS answer, a.correct AS correct ' +
                        'FROM answer AS a ' +
                        'LEFT OUTER JOIN run AS r ' +
                        '   ON a.run_id = r.id ' +
                        'WHERE r.quiz_id = $1 AND a.question = $2',
                name: 'answers by quiz_id and question',
                values: [request.params.id, request.params.index]
            });
            query.on('row', function(row) {
                answers.push(new Answer(row.run, row.question, row.answer, row.correct));
            });
            query.on('end', function() {
                reply(answers);
            });
            query.on('error', function(error) {
                handlerDbError(error, request, reply);
            });
        }
    },
    {
        method: 'GET',
        path: '/quiz/{id}/run',
        handler: function(request, reply) {
            var query = request.pg.client.query({
                text: 'INSERT INTO run (id, quiz_id) VALUES (DEFAULT, $1) RETURNING id',
                name: 'insert run',
                values: [request.params.id]
            });
            query.on('row', function(row, result) {
                result.addRow(row);
            });
            query.on('end', function(result) {
                reply(result.rows[0].id).code(201);
            });
            query.on('error', function(error) {
                handlerDbError(error, request, reply);
            });
        }
    },
    {
        method: 'POST',
        path: '/run/{id}/answer',
        handler: function(request, reply) {
            try {
                var answer = Answer.load(request.payload);
                var query = request.pg.client.query({
                    text: 'INSERT INTO answer (id, run_id, question, answer, correct) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id',
                    name: 'insert answer',
                    values: [
                        request.params.id,
                        answer.question,
                        answer.answer,
                        answer.isCorrect
                    ]
                });
                query.on('row', function(row, result) {
                    result.addRow(row);
                });
                query.on('end', function(result) {
                    reply(result.rows[0].id).code(201);
                });
                query.on('error', function(error) {
                    handlerDbError(error, request, reply);
                });
            } catch (error) {
                handlerDbError(error, request, reply);
            }
        }
    },
    {
        method: 'PUT',
        path: '/run/{id}/end',
        handler: function(request, reply) {
            try {
                var run = Run.load(request.payload);
                var query = request.pg.client.query({
                    text:   'UPDATE run SET ' +
                            '   correct_count=$1, ' +
                            '   wrong_count=$2, ' +
                            '   duration=$3, ' +
                            '   finished=$4 ' +
                            'WHERE id=$5',
                    name: 'end run',
                    values: [
                        run.correctCount,
                        run.wrongCount,
                        run.duration,
                        run.finished,
                        request.params.id
                    ]
                });
                query.on('end', function() {
                    reply().code(201);
                });
                query.on('error', function(error) {
                    handlerDbError(error, request, reply);
                });
            } catch (error) {
                handlerDbError(error, request, reply);
            }
        }
    },
    {
        method: 'GET',
        path: '/quiz/{id}/runs',
        handler: function(request, reply) {
            var query = request.pg.client.query({
                text: 'SELECT * FROM run WHERE quiz_id = $1',
                name: 'runs by quizId',
                values: [request.params.id]
            });
            query.on('row', function(row, result) {
                result.addRow(row);
            });
            query.on('end', function(result) {
                reply(result.rows);
            });
            query.on('error', function(error) {
                handlerDbError(error, request, reply);
            });
        }
    },
    {
        method: 'GET',
        path: '/quiz/{id}/stats',
        handler: function(request, reply) {
            var query = request.pg.client.query({
                text:   'SELECT trunc((correct_count*100.0)/(correct_count+wrong_count), 2) AS score ' +
                        'FROM run ' +
                        'WHERE quiz_id = $1 AND finished = TRUE',
                name: 'score by quizId',
                values: [request.params.id]
            });
            query.on('row', function(row, result) {
                result.addRow(row);
            });
            query.on('end', function(result) {
                reply(result.rows.map(function(row) { return +row.score; }));
            });
            query.on('error', function(error) {
                handlerDbError(error, request, reply);
            });
        }
    }

];


