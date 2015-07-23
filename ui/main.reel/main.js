/**
    @module "ui/main.reel"
    @requires montage
    @requires montage/ui/component
*/
var Component = require("montage/ui/component").Component,
PressComposer = require("montage/composer/press-composer").PressComposer;

/**
    Description TODO
    @class module:"ui/main.reel".Main
    @extends module:ui/component.Component
*/
exports.Main = Component.specialize( /** @lends module:"ui/main.reel".Main# */ {

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
                            "rotateY": Math.PI/2 - angle,
                            "opacity": 1 - Math.abs(i-4)*.2
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
            window.addEventListener("resize", function () {
                self.setPaths();
            }, false);
        }
    }

});