/**
 * @module ui/basketball.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Basketball
 * @extends Component
 */
exports.Basketball = Component.specialize(/** @lends Basketball# */ {

    _prevScroll: {
        value: 0
    },

    scroll: {
        value: null
    },

    scene: {
        value: null
    },

    sceneView: {
        value: null
    },

    basketballNode: {
        value: null
    },

    _onFirstFrameDidRender: {
        value: function() {
            var cameraController = this.sceneView.cameraController;
            cameraController.node = this.templateObjects.scene.rootNode;

            cameraController.zoom({
                wheelDeltaY: 10000
            });

            this.sceneView.needsDraw = true;
        }
    },

    _onScrollPathChange: {
        value: function(value) {
            var transform = this.basketballNode.glTFElement.transform;

            var newMatrix = transform.matrix;
            mat4.rotate(transform.matrix, this._prevScroll - value, vec3.createFrom(1, 0, 0), newMatrix);
            transform.matrix = newMatrix;

            this._prevScroll = value;

            this.sceneView.needsDraw = true;
        }
    },

    //
    // Montage Members
    //

    templateDidLoad: {
        value: function() {
            this._onFirstFrameDidRender = this._onFirstFrameDidRender.bind(this);
        }
    },

    enterDocument: {
        value: function(isFirstTime) {
            // Pair the scene to the sceneView (i.e. if we have exited then re-entered the document)
            if (!this.sceneView.scene) {
                this.sceneView.scene = this.scene;
            }

            this.sceneView.addEventListener("firstFrameDidRender", this._onFirstFrameDidRender);
            this.addPathChangeListener("scroll", this._onScrollPathChange);
        }
    },

    exitDocument: {
        value: function() {
            this.sceneView.removeEventListener("firstFrameDidRender", this._onFirstFrameDidRender);
            this.removePathChangeListener("scroll", this._onScrollPathChange);

            // Disconnect the scene from our view
            this.sceneView.scene = null;
        }
    }
});
