'use strict';

angular.module('contacts')
	.constant("baseURL", "http://localhost:3000/")
	.service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {

		this.getDishes = function() {
			return $resource(baseURL + "dishes/:id", null, {
				'update': {
					method: 'PUT'
				}
			});
		};

		this.getPromotion = function() {
			return $resource(baseURL + "promotions/:id", {
				id: "@id"
			}, {
				'update': {
					method: 'PUT'
				}
			});
		};
	}])

// corporate ---------------------------------------------------->
.factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {
	var corpfac = {};

	corpfac.getLeadership = function() {
		return $resource(baseURL + "leadership/:id", {
			id: "@id"
		}, {
			'update': {
				method: 'PUT'
			}
		});
	};
	return corpfac;
}])

// feedback ------------------------------------------------------>

.service('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {
	this.getFeedback = function() {
		return $resource(baseURL + "feedback/", null, {
			'save': {
				method: 'POST'
			}
		});
	};
}])

.service('contactFactory', ['$resource', 'baseURL', function($resource, baseURL) {
	this.contact = function() {
		return $resource(baseURL + "contacts/", null, {
			'create': {
				method: 'POST'
			},
			'get': {
				method: 'GET'
			},
			'query': {
				method: 'GET',
				isArray: true
			},
			'update': {
				method: 'PUT',
				params: {
					id: '@id'
				}
			},
		});
	};

	this.del = function() {
		return $resource(baseURL + "contacts/:id", null, {
			'delete': {
				method: 'DELETE',
				params: {
					id: 'id'
				}
			}
		});
	};

}])


;
/*
 - the save method worked
.service('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {

	this.getFeedback = function() {
		return $resource(baseURL + "feedback/:id");
	};
}])

feedbackFactory.getFeedback().save($scope.feedback); //in controller
*/
