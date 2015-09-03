var Answer = require('../model/answer').Answer,
    Quiz = require('../model/quiz').Quiz;

function handlerDbError(error, request, reply) {
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
            })
        }
    },
    {
        method: 'POST',
        path: '/quiz',
        handler: function(request, reply) {
            try {
                console.log(request.payload.questions[0]);
                var quiz = Quiz.load(request.payload);
                console.log(quiz);
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
                })
            } catch (error) {
                var message = request.debug ? error.message : '';
                reply(message).code(400);
            }
        }
    },
    {
        method: 'GET',
        path: '/quiz/{id}',
        handler: function(request, reply) {
            request.pg.client.query({
                text: 'SELECT document FROM quiz WHERE id = $1',
                name: 'quiz by id',
                values: [request.params.id] },
                function(err, result) {
                    if (result.rows && result.rows.length > 0) {
                        reply(result.rows[0].document);
                    } else {
                        reply().code(404);
                    }
                });
        }
    },
    {
        method: 'POST',
        path: '/quiz/{id}/answer',
        handler: function(request, reply) {
            try {
                var answer = Answer.load(request.payload);
                request.pg.client.query({
                    text: 'INSERT INTO answer (quiz_id, index, answer, correct) VALUES ($1, $2, $3, $4)',
                    name: 'insert answer',
                    values: [
                        request.params.id,
                        answer.index,
                        answer.answer,
                        answer.isCorrect
                    ]
                }, function(error) {
                    if (error) {
                        var message = request.debug ? error.message : '';
                        reply(message).code(500);
                    } else {
                        reply().code(201);
                    }
                });
            } catch (error) {
                var message = request.debug ? error.message : '';
                reply(message).code(400);
            }
        }
    },
    {
        method: 'GET',
        path: '/quiz/{id}/answer',
        handler: function(request, reply) {
            request.pg.client.query({
                text: 'SELECT * FROM answer WHERE quiz_id = $1',
                name: 'answers by quiz_id',
                values: [request.params.id]
            }, function(error, result) {
                if (error) {
                    var message = request.debug ? error.message : '';
                    reply(message).code(500);
                } else {
                    var answers = [];
                    if (result.rows) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var row = result.rows[i];
                            answers.push(new Answer(request.params.id, row.index, row.answer, row.correct));
                        }
                    }
                    reply(answers);
                }
            });
        }
    },
    {
        method: 'GET',
        path: '/quiz/{id}/answer/{index}',
        handler: function(request, reply) {
            request.pg.client.query({
                text: 'SELECT * FROM answer WHERE quiz_id = $1 AND index = $2',
                name: 'answers by quiz_id and index',
                values: [request.params.id, request.params.index]
            }, function(error, result) {
                if (error) {
                    var message = request.debug ? error.message : '';
                    reply(message).code(500);
                } else {
                    var answers = [];
                    if (result.rows) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var row = result.rows[i];
                            answers.push(new Answer(request.params.id, row.index, row.answer, row.correct));
                        }
                    }
                    reply(answers);
                }
            });
        }
    }

];


