'use strict';

angular.module('contacts')

.controller('ContactsController', ['$scope', '$state', 'contactFactory', function($scope, $state, contactFactory) {
	$scope.isok = false;

	contactFactory.contacts().query()
		.$promise.then(
			function(response) {
				$scope.dataset = response;
				$scope.ok = true;
			},
			function(response) {
				$scope.message = "Error: " + response.status + " " + response.statusText;
			}
		);

	$scope.deleteContact = function(id) {
		contactFactory.contact().delete({
				id: id
			})
			.$promise.then(
				function(response) {
					$scope.isok = true;
					$state.reload();
				},
				function(response) {
					$scope.message = "Error: " + response.status + " " + response.statusText;
				}
			);
	};

}])

.controller('NewController', ['$scope', 'contactFactory', function($scope, contactFactory) {
	$scope.titles = ['Mr', 'Mrs', 'Miss'];
	$scope.states = ['NSW', 'VIC', 'QLD', 'ACT', 'TAS', 'NT', 'SA', 'WA'];
	$scope.categories = ['Family', 'Work', 'Professional', 'Career'];
	$scope.isok = false;
	$scope.contact = {};
	$scope.contact.active = true;
	$scope.contact.date_edit = new Date().toISOString();
	$scope.createContact = function() {
		contactFactory.contacts().create($scope.contact)
			.$promise.then(
				function(response) {
					$scope.isok = true;
					$scope.contact = {
						active: true,
						title: "",
						namef: "",
						namel: "",
						jobtitle: "",
						company: "",
						address1: "",
						address2: "",
						suburb: "",
						state: "",
						pcode: "",
						category: "",
						phoneh: "",
						phonew: "",
						phonem: "",
						birthday: null,
						nextcall: null,
						email: "",
						product: "",
						family: "",
						comments: ""
					};
					$scope.contactsForm.$setPristine();
				},
				function(response) {
					$scope.message = "Error: " + response.status + " " + response.statusText;
				}
			);
	};
}])

.controller('EditController', ['$scope', '$stateParams', 'contactFactory', function($scope, $stateParams, contactFactory) {
	$scope.titles = ['Mr', 'Mrs', 'Miss'];
	$scope.states = ['NSW', 'VIC', 'QLD', 'ACT', 'TAS', 'NT', 'SA', 'WA'];
	$scope.categories = ['Family', 'Work', 'Professional', 'Career'];
	$scope.isok = false;
	//$scope.dateType = "date";

	$scope.contact = contactFactory.contact().get({
			id: parseInt($stateParams.id, 10)
		})
		.$promise.then(
			function(response) {
				$scope.contact = response;
				$scope.isok = true;
				$scope.contact.birthday = new Date($scope.contact.birthday);
				$scope.contact.nextcall = new Date($scope.contact.nextcall);
			},
			function(response) {
				$scope.message = "Error: " + response.status + " " + response.statusText;
			}
		);

	$scope.updateContact = function(id) {
		contactFactory.contact().update({
				id: $scope.contact.id
			}, $scope.contact)
			.$promise.then(
				function(response) {
					$scope.contactsForm.$setPristine();
					$scope.isok = true;
				},
				function(response) {
					$scope.message = "Error: " + response.status + " " + response.statusText;
				}
			);
	};
}])



.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

	$scope.showDish = false;
	$scope.message = "Loading ...";
	$scope.dish = menuFactory.getDishes().get({
			id: parseInt($stateParams.id, 10)
		})
		.$promise.then(
			function(response) {
				$scope.dish = response;
				$scope.showDish = true;
			},
			function(response) {
				$scope.message = "Error: " + response.status + " " + response.statusText;
			}
		);

}])

.controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {

	$scope.mycomment = {
		rating: 5,
		comment: "",
		author: "",
		date: ""
	};

	$scope.submitComment = function() {
		$scope.mycomment.date = new Date().toISOString();
		//console.log($scope.mycomment);
		$scope.dish.comments.push($scope.mycomment);

		menuFactory.getDishes().update({
			id: $scope.dish.id
		}, $scope.dish);
		$scope.commentForm.$setPristine();
		$scope.mycomment = {
			rating: 5,
			comment: "",
			author: "",
			date: ""
		};
	};
}])

.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
	var default_chief = 3;
	// dish ------------------------------------------------------>
	$scope.showDish = false;
	$scope.message = "Loading ...";
	$scope.dish = menuFactory.getDishes().get({
			id: 0
		})
		.$promise.then(
			function(response) {
				$scope.dish = response;
				$scope.showDish = true;
			},
			function(response) {
				$scope.message = "Error: " + response.status + " " + response.statusText;
			}
		);
	// promotion ------------------------------------------------->
	$scope.promotion = menuFactory.getPromotion().get({
			id: 0
		})
		.$promise.then(
			function(response) {
				$scope.promotion = response;
				$scope.showDish = true;
			},
			function(response) {
				$scope.message = "Error: " + response.status + " " + response.statusText;
			}
		);
	//leadership ------------------------------------------------->
	$scope.leadership = corporateFactory.getLeadership().get({
			id: 3
		})
		.$promise.then(
			function(response) {
				$scope.leadership = response;
				$scope.showDish = true;
			},
			function(response) {
				$scope.message = "Error: " + response.status + " " + response.statusText;
			}
		);
}])

.controller('HelpController', ['$scope', function($scope) {
	$scope.mydate = new Date().toISOString();
}]);
