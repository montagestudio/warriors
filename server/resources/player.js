function handlerDbError(error, request, reply) {
    console.log(error);
    var message = request.debug ? error.message : '';
    reply(message).code(500);
}

function playerSorter(playerA, playerB) {
    return playerA.number > playerB.number ? 1 : -1;
}

module.exports = [
    {
        method: 'GET',
        path: '/player/{id}',
        handler: function(request, reply) {
            var query = request.pg.client.query({
                text: "SELECT json_array_elements(json_array_elements(document->'questions')->'options') AS player FROM quiz WHERE id = $1",
                name: 'list players by id',
                values: [request.params.id]
            });
            var playersInResult = [];
            query.on('row', function(row, result) {
                if (playersInResult.indexOf(row.player.number) == -1) {
                    result.addRow(row.player);
                    playersInResult.push(row.player.number);
                }
            });
            query.on('end', function(result) {
                if (result.rowCount > 0) {
                    reply(result.rows.sort(playerSorter));
                } else {
                    reply().code(404);
                }
            });
            query.on('error', function(error) {
                handlerDbError(error, request, reply);
            });
        }
    }

];


