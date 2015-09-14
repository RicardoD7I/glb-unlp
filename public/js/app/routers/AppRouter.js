define(['marionette', 'controllers/Controller'], function(Marionette, Controller) {
	return Marionette.AppRouter.extend({

		appRoutes: {
			"": "index",
			"chat": "main"
		}
	});
});