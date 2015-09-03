var fs = require('fs'),
    files = fs.readdirSync(__dirname + '/'),
    routes = [];

for (var i = 0; i < files.length; i++) {
    var file = files[i]
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
        var route = require('./' + file);
        routes = routes.concat(route);
    }
}

exports.routes = routes;
