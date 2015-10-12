var Player = function(number, name, position, heightInFeet, heightInInches, weight, birthdate, summary, image) {
    this.number = number;
    this.name = name;
    this.position = position;
    this.heightInFeet = heightInFeet;
    this.heightInInches = heightInInches;
    this.weight = weight;
    this.birthdate = birthdate;
    this.summary = summary;
    this.image = image;
};

Player.load = function(obj) {
    if (typeof obj                  === 'undefined' ||
        typeof obj.number           === 'undefined' ||
        typeof obj.name             === 'undefined' ||
        typeof obj.position         === 'undefined' ||
        typeof obj.heightInFeet     === 'undefined' ||
        typeof obj.heightInInches   === 'undefined' ||
        typeof obj.weight           === 'undefined' ||
        typeof obj.birthdate        === 'undefined' ||
        typeof obj.summary          === 'undefined' ||
        typeof obj.image            === 'undefined'
    ) {
        throw new Error('Incorrect data to load:' + JSON.stringify(obj));
    }
    return new Player(obj.number, obj.name, obj.position, obj.heightInFeet, obj.heightInInches, obj.weight, obj.birthdate, obj.summary, obj.image);
};

exports.Player = Player;
