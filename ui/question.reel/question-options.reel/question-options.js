/**
 * @module ui/question-options.reel
 */
var Component = require("montage/ui/component").Component,
teamData = require("../../../assets/data.json");

/**
 * @class QuestionOptions
 * @extends Component
 */
exports.QuestionOptions = Component.specialize(/** @lends QuestionOptions# */ {
    constructor: {
        value: function QuestionOptions() {
            this.super();
        }
    },

    currentIndex: {
        value: 0
    },

    transitionStarted: {
        value: false
    },

    flowRibbon: {
        serializable: true,
        value: null
    },

    flowDidTranslateEnd: {
        value: function () {
            this.currentIndex = this.flowRibbon.scroll;
            this.transitionStarted = false;
        }
    },

    flowDidTranslateStart: {
        value: function () {
            this.transitionStarted = true;
        }
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
                            "previousDensity": 1.1,
                            "nextDensity": 1.1,
                            "rotateY": Math.PI/2 - angle,
                            "opacity": 1 - Math.abs(i-4)*.2
                        }
                    );
                }

                this.flowRibbon.paths = [
                    {
                        "knots": pagesKnots,
                        "headOffset": 5.5,
                        "tailOffset": 5.5,
                        "units": {
                            "rotateY": "rad",
                            "opacity": "",
                            "rotateX": "rad"
                        }
                    }
                ];
        }
    },

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                this.addEventListener("nextQuestion", this, false);
            }
        }
    },

    handleNextQuestion: {
        value: function () {
            this.flowRibbon.startScrollingIndexToOffset(0,0);
        }
    },

    templateDidLoad: {
        value: function () {

            this.setPaths();

            // handle resize function this.setPaths

            window.addEventListener("resize", this, false);

            var sceneView = this.templateObjects.sceneView;
            var cameraController = sceneView.cameraController;

            // Zoom the ball once the scene is ready to go
            sceneView.addEventListener("firstFrameDidRender", function() {
                cameraController.node = self.templateObjects.scene.rootNode;
                cameraController.zoom({
                    wheelDeltaY: 7000
                });
                sceneView.needsDraw = true;
            });

            var self = this;
            this.templateObjects.flow.addPathChangeListener("scroll", function(value) {
                if (!value) {
                    return;
                }

                var angle = value * -20;

                cameraController.node = self.templateObjects.scene.rootNode;

                cameraController.beginTranslate({
                    type: "translateStart",
                    translateX: 0,
                    translateY: 0
                });

                cameraController.translate({
                    type: "translate",
                    translateX: angle,
                    translateY: 0
                });

                cameraController.endTranslate({
                    type: "translateEnd",
                    translateX: 0,
                    translateY: 0
                });

                sceneView.needsDraw = true;
            });
        }
    }
});
