var Localizer = require("montage/core/localizer"),
    defaultLocalizer = Localizer.defaultLocalizer;


var ApplicationDelegate = exports.ApplicationDelegate = function ApplicationDelegate () {};

ApplicationDelegate.prototype.willFinishLoading = function (app) {

    defaultLocalizer.availableLocales.then(function (locales) {
        app.availableLocales = locales;
    });

    app.defaultLocalizer = defaultLocalizer;
};
