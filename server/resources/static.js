module.exports = [
    {
        method: 'GET',
        path:   '/{params*}',
        handler: {
            directory: {
                path:   'static',
                index:  true
            }
        }
    }
];
