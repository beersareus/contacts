'use strict';

angular.module('contacts')
	.constant("baseURL", "http://localhost:3000/")

.service('contactFactory', ['$resource', 'baseURL', function($resource, baseURL) {
	this.contacts = function() {
		return $resource(baseURL + "contacts/", null, {
			'create': {
				method: 'POST'
			},
			'query': {
				method: 'GET',
				isArray: true
			},
		});
	};

	this.contact = function() {
		return $resource(baseURL + "contacts/:id", null, {
			'delete': {
				method: 'DELETE',
				params: {
					id: 'id'
				}
			},
			'get': {
				method: 'GET',
				params: {
					id: 'id'
				}
			},
			'update': {
				method: 'PUT',
				params: {
					id: 'id'
				}
			}
		});
	};

}])

;
