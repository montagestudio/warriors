var TimerProvider = require("core/timer-provider").TimerProvider;

describe('test/timer-provider-spec', function() {
    var done,
        timerProvider;
    beforeEach(function () {
        done = false;
    });

    afterEach(function() {
        if (timerProvider._timeoutId) {
            clearTimeout(timerProvider._timeoutId);
        }
    });

    describe('When timer is running', function() {

        it('should decrement current time by 1 every second', function() {
            timerProvider = new TimerProvider;

            timerProvider.start(90);

            runs(function() {
                setTimeout(function() {
                    done = true;
                }, 1100);
            });

            waitsFor(function() {
                return done;
            });

            runs(function() {
                expect(timerProvider.currentTime).toBeDefined();
                expect(timerProvider.currentTime).toEqual(89);
                timerProvider.pause();
            });
        });

        describe('and then paused', function() {

            it('should stop the currentTime', function() {
                var paused = false;
                timerProvider = new TimerProvider;
                timerProvider.start(90);

                runs(function() {
                    setTimeout(function() {
                        timerProvider.pause();
                        paused = true;
                    }, 2100);
                });

                waitsFor(function() {
                    return paused;
                });

                runs(function() {
                    setTimeout(function() {
                        done = true;
                    }, 2000);
                });

                waitsFor(function() {
                    return done;
                });

                runs(function() {
                    expect(timerProvider.currentTime).toBeDefined();
                    expect(timerProvider.currentTime).toEqual(88);
                });
            });

            describe('and then resumed', function() {
                it('should continue decrementing from the same time', function() {
                    var paused = false;
                    timerProvider = new TimerProvider;
                    timerProvider.start(90);

                    runs(function() {
                        setTimeout(function() {
                            timerProvider.pause();
                            paused = true;
                        }, 2100);
                    });

                    waitsFor(function() {
                        return paused;
                    });

                    runs(function() {
                        timerProvider.resume();
                        setTimeout(function() {
                            done = true;
                        }, 1100);
                    });

                    waitsFor(function() {
                        return done;
                    });

                    runs(function() {
                        expect(timerProvider.currentTime).toBeDefined();
                        expect(timerProvider.currentTime).toEqual(87);
                    });
                });
            });
        });
    });

    //$question -   1. how do you check for when the timer is done
    //              2. it seems that the timer doesn't pause immeadiately because of the setTimeout increment
    //                  how would we get around that?

});
