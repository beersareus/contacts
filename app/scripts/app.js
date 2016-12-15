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
					controller: 'IndexController'
				},
				'footer': {
					templateUrl: 'views/footer.html',
				}
			}
		})

		// route for the contacts page
		.state('app.contacts', {
			url: 'contacts',
			views: {
				'content@': {
					templateUrl: 'views/contacts.html',
					controller: 'ContactsController'
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
			url: 'wip',
			views: {
				'content@': {
					templateUrl: 'views/wip.html',
					controller: 'ContactsController'
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
