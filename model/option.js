var Option = function() {
};

Option.load = function(obj) {
    var option = new Option();
    for (var name in obj) {
        if (obj.hasOwnProperty(name)) {
            Object.defineProperty(option, name, {
                value: obj[name]
            });
        }
    }
    return option;
};

exports.Option = Option;
