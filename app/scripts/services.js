'use strict';

angular.module('confusionApp')
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
}]);
/*
 - the save method worked
.service('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {

	this.getFeedback = function() {
		return $resource(baseURL + "feedback/:id");
	};
}])

feedbackFactory.getFeedback().save($scope.feedback); //in controller
*/
