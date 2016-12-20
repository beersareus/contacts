$scope.xx = function(id) {
	contactFactory.del().delete({
			id: id
		})
		.$promise.then(
			function(response) {
				//success
				$scope.isok = true;
				$state.reload();
			},
			function(response) {
				//error
				$scope.isok = false;
				$scope.message = "Error: " + response.status + " " + response.statusText;
			}
		);
};
