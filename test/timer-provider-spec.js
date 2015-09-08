var TimerProvider = require("core/timer-provider").TimerProvider;

describe('test/timer-provider-spec', function() {
    var done;
    beforeEach(function () {
        done = false;
    });

    describe('When timer is initialized', function() {

        it('should set quizTime', function() {
            var currentTime,
                timerProvider = new TimerProvider;

            timerProvider.init(60);

            quizTime = timerProvider.quizTime;

            expect(quizTime).toBeDefined();
            expect(quizTime).toEqual(60);
        });

        it('should set currentTime equal to quizTime', function() {
            var currentTime,
                timerProvider = new TimerProvider;
            timerProvider.init(90);

            currentTime = timerProvider.currentTime;

            expect(currentTime).toBeDefined();
            expect(currentTime).toEqual(90);
        });
    });

    describe('When timer is running', function() {

        it('should decrement current time by 1 every second', function() {
            var currentTime,
                startTime,
                timerProvider = new TimerProvider;
            timerProvider.init(90);

            timerProvider.start();

            setTimeout(function(){
                currentTime = timerProvider.currentTime;
                expect(currentTime).toBeDefined();
                expect(currentTime).toEqual(89);
                timerProvider.pause();
            }, 1000);
        });

        describe('and then paused', function() {

            it('should stop the currentTime', function() {
                var currentTime,
                    timerProvider = new TimerProvider;
                timerProvider.init(90);
                timerProvider.start();

                setTimeout(function(){
                    timerProvider.pause();

                    setTimeout(function(){
                        currentTime = timerProvider.currentTime;

                        //$question - these aren't being checked because of the timeout?
                        expect(currentTime).toBeDefined();
                        expect(currentTime).toEqual(88);
                    }, 2000)

                }, 1000);

            });
        });

        describe('and reset', function() {

            it('should set currentTime to quizTime', function() {
                var currentTime,
                    timerProvider = new TimerProvider;

                timerProvider.init(60);
                timerProvider.reset();

                quizTime = timerProvider.quizTime;

                expect(quizTime).toBeDefined();
                expect(quizTime).toEqual(60);
            });

            it('should set currentTime to reset time', function() {
                var currentTime,
                    timerProvider = new TimerProvider;

                timerProvider.init(60);
                timerProvider.reset(90);

                quizTime = timerProvider.quizTime;

                expect(quizTime).toBeDefined();
                expect(quizTime).toEqual(90);
            });
        });
    });

    //$question -   1. how do you check for when the timer is done
    //              2. it seems that the timer doesn't pause immeadiately because of the setTimeout increment
    //                  how would we get around that?

});
