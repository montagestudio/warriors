var VIEWS = ["intro", "quiz", "results"];

exports.NavigationController = {
    currentView: "intro",

    selectView: function(view){
        if (VIEWS.indexOf(view) > -1) {
            this.currentView = view;
        }
    }
}
