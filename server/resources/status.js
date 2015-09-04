module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply().code(204);
        }
    },
    {
        method: 'GET',
        path: '/status',
        handler: function(request, reply) {
            var query = request.pg.client.query({
                text: 'SELECT 1 FROM quiz',
                name: 'check quiz'
            });
            query.on('end', function() {
                reply('OK');
            });
            query.on('error', function() {
                reply('KO');
            })
        }
    }
];
