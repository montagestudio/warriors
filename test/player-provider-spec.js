var PlayerProvider = require("core/player-provider").PlayerProvider,
    Player = require('model/player').Player,
    Run = require('model/run').Run;

describe('test/player-provider-spec', function() {
    var done,
        backendServiceMock;
    beforeEach(function() {
        done = false;
        backendServiceMock = {
            get: function() {}
        };
    });
    describe('When loading data', function() {
        it('should fetch data from backend', function() {
            var providedPath,
                playerProvider = new PlayerProvider();
            playerProvider.init('FOO', backendServiceMock);
            backendServiceMock.get = function(path) {
                providedPath = path;
                done = true;
                return Promise.resolve({});
            };

            runs(function() {
                playerProvider.loadData();
            });

            waitsFor(function() {
                return done;
            });

            runs(function() {
                expect(providedPath).toBeDefined();
                expect(providedPath).toEqual('player/FOO');
            });
        });

        it('should load players', function() {
            var playerProvider = new PlayerProvider(),
                playersMock = [
                    {
                        number: 42,
                        name: 'foo bar',
                        position: 'foo',
                        heightInFeet: 12,
                        heightInInches: 34,
                        weight: 321,
                        birthdate: '12/13/1982',
                        summary: "this is a really interesting summary, isn't it ?"
                    },
                    {
                        number: 33,
                        name: 'bar baz',
                        position: 'baz',
                        heightInFeet: 31,
                        heightInInches: 21,
                        weight: 210,
                        birthdate: '2/25/1980',
                        summary: "another interesting summary..."
                    }
                ];
            playerProvider.init('FOO', backendServiceMock);
            backendServiceMock.get = function() {
                return Promise.resolve({status: 200, body: JSON.stringify(playersMock)})
                    .then(function(response) {
                        done = true;
                        return response;
                    });
            };

            runs(function() {
                playerProvider.loadData();
            });

            waitsFor(function() {
                return done;
            });

            runs(function() {
                expect(playerProvider.players).toBeDefined();
                expect(playerProvider.players).not.toBeNull();
                expect(playerProvider.players.length).toEqual(2);
                expect(playerProvider.players[0]).toEqual(playersMock[0]);
                expect(playerProvider.players[1]).toEqual(playersMock[1]);
            });
        })
    });

    describe('When getting a player', function() {
        it('should return player', function() {
            var player,
                playerProvider = new PlayerProvider().init('FOO', backendServiceMock);
            playerProvider.players = [
                {
                    number: 42,
                    name: 'foo bar',
                    position: 'foo',
                    heightInFeet: 12,
                    heightInInches: 34,
                    weight: 321,
                    birthdate: '12/13/1982',
                    summary: "this is a really interesting summary, isn't it ?"
                },
                {
                    number: 33,
                    name: 'bar baz',
                    position: 'baz',
                    heightInFeet: 31,
                    heightInInches: 21,
                    weight: 210,
                    birthdate: '2/25/1980',
                    summary: "another interesting summary..."
                }
            ];

            player = playerProvider.getPlayer(42);

            expect(player).toBeDefined();
            expect(player.number).toEqual(42);
            expect(player.name).toEqual('foo bar');
        })
    })
});
