'use strict';

angular.module('contacts', ['ui.router', 'ngResource'])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider

		// route for the home page
			.state('app', {
			url: '/',
			views: {
				'header': {
					templateUrl: 'views/header.html',
				},
				'content': {
					templateUrl: 'views/home.html',
					controller: 'ContactsController'
				},
				'footer': {
					templateUrl: 'views/footer.html',
				}
			}
		})

		// route for the new page
		.state('app.new', {
			url: 'new',
			views: {
				'content@': {
					templateUrl: 'views/new.html',
					controller: 'NewController'
				}
			}
		})

		// route for the edit page
		.state('app.edit', {
			url: 'edit/:id',
			views: {
				'content@': {
					templateUrl: 'views/edit.html',
					controller: 'EditController'
				}
			}
		})


		// route for the help page
		.state('app.help', {
			url: 'help',
			views: {
				'content@': {
					templateUrl: 'views/help.html',
					controller: 'HelpController'
				}
			}
		})

		// route for wip
		.state('app.wip', {
			url: 'wip/:id',
			views: {
				'content@': {
					templateUrl: 'views/wip.html',
					controller: 'EditController'
				}
			}
		})

		// route for the dishdetail page
		.state('app.dishdetails', {
			url: 'menu/:id',
			views: {
				'content@': {
					templateUrl: 'views/dishdetail.html',
					controller: 'DishDetailController'
				}
			}
		});

		$urlRouterProvider.otherwise('/');
	});
