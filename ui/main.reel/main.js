/**
 @module "ui/main.reel"
 @requires montage
 @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component,
    PressComposer = require("montage/composer/press-composer").PressComposer,
    teamData = require("../../assets/data.json"),
    NavigationController = require("core/navigation-controller").NavigationController;

/**
 Description TODO
 @class module:"ui/main.reel".Main
 @extends module:ui/component.Component
 */
exports.Main = Component.specialize(/** @lends module:"ui/main.reel".Main# */ {

    enterDocument: {
        value: function Main(firstTime) {
            if (firstTime) {
                wx.ready(function () {
                    alert('I\'m ready');
                });

                //sina WeiBo
                WB2.anyWhere(function(W){
                    W.widget.publish({
                        'id' : 'share_to_weibo',
                        'default_text' : '预置方案　& \r\n我可以换行.',
                        'callback' : function(o) {
                            alert('aaaa')
                        }
                    });
                });

                //Twitter
                twttr.ready(
                    function (twttr) {
                        twttr.widgets.createShareButton(
                            'http://lx179.com/wechat/warriors/',
                            document.getElementById('share_to_twitter'),
                            {
                                text: 'Warriors Favorite Stars Voting! Win Curry Signed T-Shirt!',
                                count: 'none'
                            }
                        )
                    }
                );
                this.application.navigationController = NavigationController;
            }
        }
    },

    currentIndex: {
        value: 0
    },

    didTranslateEnd: {
        value: function () {
            this.currentIndex = this.flowRibbon.scroll;
        }
    },

    flowRibbon: {
        serializable: true,
        value: null
    },

    pointInCircleAt: { // returns a point in a unit radius circle with center at origin for a given angle
        value: function (angle) {
            return [Math.cos(angle), Math.sin(angle)];
        }
    },

    tangentInCircleAt: { // returns normalized tangent vector for a point in a circle at a given angle
        value: function (angle) {
            return [-Math.sin(angle), Math.cos(angle)];
        }
    },

    scaleVector: {
        value: function (vector, scale) {
            return [
                vector[0] * scale,
                vector[1] * scale
            ];
        }
    },

    setPaths: {
        enumerable: false,
        value: function () {
            var pagesKnots = [],
                evenPagesKnots = [],
                bezierHandlerLength = .130976446, // magic number, optimized length of a handler to create a 16-segments cubic bezier unit radius circle
                point,
                tangent,
                angle,
                halfPageWidth,
                i,
                self = this;

            halfPageWidth = 1300;
            for (i = -1; i <= 9; i++) {
                angle = Math.PI - i * Math.PI / 8;
                point = this.scaleVector(this.pointInCircleAt(angle), halfPageWidth);
                tangent = this.scaleVector(this.tangentInCircleAt(angle), halfPageWidth * bezierHandlerLength);
                pagesKnots.push(
                    {
                        "knotPosition": [point[0], 0, point[1]],
                        "previousHandlerPosition": [point[0] + tangent[0], 0, point[1] + tangent[1]],
                        "nextHandlerPosition": [point[0] - tangent[0], 0, point[1] - tangent[1]],
                        "previousDensity": .9,
                        "nextDensity": .9,
                        "rotateY": Math.PI / 2 - angle,
                        "opacity": 1 - Math.abs(i - 4) * .2
                    }
                );
            }

            this.flowRibbon.paths = [
                {
                    "knots": pagesKnots,
                    "headOffset": 4.5,
                    "tailOffset": 4.5,
                    "units": {
                        "rotateY": "rad",
                        "opacity": "",
                        "rotateX": "rad"
                    }
                }
            ];

        }
    },

    templateDidLoad: {
        value: function () {
            var self = this;

            this.setPaths();

            this.flowRibbon.content = teamData;

            // handle resize function this.setPaths

            window.addEventListener("resize", this, false);
        }
    },

    handlePage1Action: {
        value: function () {
            console.log("page1");
            this.application.navigationController.selectView('page1');
        }
    },

    handlePage2Action: {
        value: function () {
            console.log("page2");
            this.application.navigationController.selectView('page2');
        }
    },

    handlePage3Action: {
        value: function () {
            //console.log("page3");
            this.application.navigationController.selectView('page3');
        }
    },

    handlePage4Action: {
        value: function () {
            //console.log("page4");
            //this.application.navigationController.selectView('page4');
            wx.onMenuShareTimeline({
                title: 'Warriors Favorite Stars Voting! Win Curry Signed T-Shirt!',
                link: 'http://lx179.com/wechat/warriors/',
                imgUrl: 'http://lx179.com/wechat/warriors/assets/image/posters/1.jpg',
                trigger: function (res) {
                    alert('User click share to friend cycle');
                },
                success: function (res) {
                    alert('Share successfully');
                },
                cancel: function (res) {
                    alert('Share Canceled');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
            alert('Start listen share friend event');
        }
    }

});
