#!/usr/bin/env node
var Hapi = require('hapi');

function loadConfiguration() {
    var nconf = require('nconf');

    nconf.formats.yaml = require('nconf-yaml');
    var configurationFile = process.env.WARRIORS_CONF_FILE || './configuration.yml';
    nconf.argv()
        .env()
        .file(configurationFile);

    nconf.defaults({
        server: {
            address: "0.0.0.0",
            port: 3000
        },
        db: {
            url: 'postgres://warrior:W4Rr1oR@localhost/warriors'
        }
    });
    return nconf;
}

function loadResources(server) {
    var routes = require('./resources').routes;
    console.log(routes);
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i];
        if (typeof route.handler === 'function') {
            route.config = route.config || {};
            route.config.tags = ['api'];
            route.config.handler = route.handler;
            delete route.handler;
        }
        server.route(route);
    }
}

function startServer(nconf) {
    var server = new Hapi.Server();

    server.connection({
        address: nconf.get('server:address'),
        port: nconf.get('server:port'),
        labels: ['api']
    });

    server.ext('onRequest', function (request, reply) {
        request.debug = request.headers['user-agent'] === 'Hapi, I am your father';
        return reply.continue();
    });

    server.register([
        require('inert'),
        require('vision'),
        {
            register: require('hapi-swaggered')
        },
        {
            register: require('hapi-swaggered-ui'),
            options: {
                title: 'Example API',
                path: '/docs'
            }
        },
        {
            register: require('hapi-node-postgres'),
            options: {
                connectionString: nconf.get('db:url'),
                native: false
            }
        }
    ],
        {
            select: 'api'
        },
    function(err) {
        if (err) {
            throw err;
        }
    });

    loadResources(server);

    server.start(function () {
        console.log('Server listening on:', server.info.address + ':' + server.info.port);
    });
}

startServer(loadConfiguration());
