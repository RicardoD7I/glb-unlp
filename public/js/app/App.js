define(['jquery', 'backbone', 'marionette', 'underscore', 'layouts/RootLayoutView'],
    function ($, Backbone, Marionette, _, RootLayoutView) {
        var App = new Backbone.Marionette.Application();

        App.rootLayout = new RootLayoutView({
            regions: {
                headerRegion:"#global-header",
                mainRegion:"#main"
            }
        });

        App.static = {};

        App.on('start', function (options) {
            if (Backbone.history) Backbone.history.start();
        });

        return App;
    });