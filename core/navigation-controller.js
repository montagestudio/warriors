var VIEWS = ["page1", "page2", "page3", "page4"];

exports.NavigationController = {
    currentView: "page1",

    selectView: function(view){
        if (VIEWS.indexOf(view) > -1) {
            this.currentView = view;
        }
    }
}
