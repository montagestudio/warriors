#!/usr/bin/env node
var Hapi = require('hapi');

function loadConfiguration() {
    var nconf = require('nconf');

    nconf.formats.yaml = require('nconf-yaml');
    var configurationFile = process.env.WARRIORS_CONF_FILE || './configuration.yaml';

    nconf
        .argv()
        .file({ file: configurationFile, format: nconf.formats.yaml })
        .env('__');

    nconf.defaults({
        server: {
            host: "0.0.0.0",
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
    var server = new Hapi.Server({
        connections: {
            routes: {
                cors: true
            }
        }
    });

    server.connection({
        address: nconf.get('server:host'),
        port: nconf.get('server:port'),
        labels: ['api']
    });

    server.ext('onRequest', function (request, reply) {
        if (request.headers['$wssc'] === 'http' && request.headers['x-force-http'] != 'unsafe') {
            return reply()
                .redirect('https://' + request.headers.host + request.url.path)
                .code(301);
        } else {
            request.debug = request.headers['user-agent'] === 'Hapi, I am your father';
            return reply.continue();
        }
    });

    server.register([
        require('inert'),
        require('vision'),
        {
            register: require('hapi-swaggered'),
            options: {
                info: {
                    title: 'Warriors API',
                    description: 'API used to persist and share quiz data',
                    version: '1.0'
                }
            }
        },
        {
            register: require('hapi-swaggered-ui'),
            options: {
                title: 'Warriors API',
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
