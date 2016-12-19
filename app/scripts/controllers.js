'use strict';

angular.module('contacts')
	.controller('ContactsControllerSetup', ['$scope', function($scope) {
		$scope.feedback = {
			mychannel: "",
			firstName: "",
			lastName: "",
			agree: false,
			email: ""
		};

		var channels = [{
			value: "tel",
			label: "Tel."
		}, {
			value: "Email",
			label: "Email"
		}];

		$scope.channels = channels;
		$scope.invalidChannelSelection = false;

	}])

.controller('ContactsController', ['$scope', '$stateParams', 'feedbackFactory', 'contactFactory', function($scope, $stateParams, feedbackFactory, contactFactory) {
	$scope.ok = false;
	$scope.sendFeedback = function() {
		if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
			$scope.invalidChannelSelection = true;
		} else {
			feedbackFactory.getFeedback().save($scope.feedback);
			$scope.invalidChannelSelection = false;
			$scope.feedback = {
				mychannel: "",
				firstName: "",
				lastName: "",
				agree: false,
				email: ""
			};
			$scope.feedback.mychannel = "";
			$scope.contactsForm.$setPristine();
		}
	};

	$scope.saveContact = function() {
		contactFactory.contact().create($scope.contact);
		$scope.contact = {
			title: "",
			namef: "",
			namel: ""
		};
		$scope.contactsForm.$setPristine();
	};

	contactFactory.contact().query()
		.$promise.then(
			function(response) {
				$scope.contacts = response;
				$scope.ok = true;
			},
			function(response) {
				$scope.message = "Error: " + response.status + " " + response.statusText;
			}
		);

	$scope.deleteContact = function(id) {
		contactFactory.contact().delete({
			id: id
		});
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
