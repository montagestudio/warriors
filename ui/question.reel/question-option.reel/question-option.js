var Component = require("montage/ui/component").Component;

var QuestionOption = exports.QuestionOption = Component.specialize( {

    prepareForActivationEvents: {
        value: function () {
            this.element.addEventListener('click', this, false);
        }
    },

    _data: {
        value: null
    },

    data: {
        get: function () {
            return this._data;
        },
        set: function (value) {
            if (this._data !== value) {
                this._data = value;
                this.needsDraw = true;
            }
        }
    },

    draw: {
        value: function () {
            if (this.data) {
                this.playerImage.style.backgroundImage = "url(" + this.data.image + ")";
            }
        }
    },

    handleClick: {
        value: function (e) {

            if (this.flowContent && this.data == this.flowContent[this.currentIndex] && e.target !== this.submitAnswer) {
                if (this.classList.contains("show-details")) {
                    this.hideDetails();
                } else {
                    this.showDetails();
                }
            }
        }
    },

    showDetails: {
        value: function () {
            this.classList.add("show-details");
            this.classList.remove("hide-details");
        }
    },

    hideDetails: {
        value: function () {
            this.classList.add("hide-details");
            this.classList.remove("show-details");
        }
    },

    setCorrect: {
        value: function () {
            this.classList.add("is-correct");
        }
    },

    setWrong: {
        value: function () {
            this.classList.add("is-wrong");
        }
    },

    reset: {
        value: function () {
            var self = this;
            setTimeout(function(){
                self.dispatchEventNamed("questionTransition", true, true);

                setTimeout(function(){
                    self.dispatchEventNamed("nextQuestion", true, true);
                    self.classList.remove("is-wrong");
                    self.classList.remove("is-correct");
                },500);

            },1000);
        }
    },

    handleSubmitAnswerAction: {
        value: function () {

            if (this.application.quizController.answer(this.data)){
                this.setCorrect();
                this.reset();


            } else {
                this.setWrong();
                this.reset();
            }

        }
    }
});

