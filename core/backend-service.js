/**
 * @module backend-service
 */
var Montage = require("montage/core/core").Montage,
    request = require('montage/core/request');

var GET     =   'GET',
    POST    =   'POST',
    PUT     =   'PUT';

var application_json = 'application/json';
/**
 * @class BackendService
 * @extends Montage
 */
exports.BackendService = Montage.specialize(/** @lends BackendService# */ {

    _backendUrl: {
        value: null
    },

    init: {
        value: function(backendUrl) {
            this._backendUrl = backendUrl;
        }
    },

    _getUrlFromPath: {
        value: function(path) {
            return [this._backendUrl, path].join('/');
        }
    },

    get: {
        value: function(path) {
            return request({
                method: GET,
                url: this._getUrlFromPath(path)
            });
        }
    },

    post: {
        value: function(path, data) {
            return request({
                method: POST,
                url: this._getUrlFromPath(path),
                body: data ? JSON.stringify(data) : '',
                headers: {
                    'content-type': application_json
                }
            });
        }
    },

    put: {
        value: function(path, data) {
            return request({
                method: PUT,
                url: this._getUrlFromPath(path),
                body: data ? JSON.stringify(data) : '',
                headers: {
                    'content-type': application_json
                }
            });
        }
    }
});







