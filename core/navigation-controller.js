var VIEWS = ["voting", "results"];

exports.NavigationController = {
    currentView: "results",

    selectView: function(view){
        if (VIEWS.indexOf(view) > -1) {
            this.currentView = view;
        }
    }
}
