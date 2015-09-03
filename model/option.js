var Option = function() {
};

Option.load = function(obj) {
    var option = new Option();
    for (var name in obj) {
        if (obj.hasOwnProperty(name)) {
            option[name] = obj[name];
        }
    }
    return option;
};

exports.Option = Option;
