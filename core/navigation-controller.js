var VIEWS = ["quiz", "results"];

exports.NavigationController = {
    currentView: "quiz",

    selectView: function(view){
        if (VIEWS.indexOf(view) > -1) {
            this.currentView = view;
        }
    }
}
