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

///////////////////////////////
<
button ng - click = "toggleDetails()"
class = "btn btn-xs btn-primary pull-right"
type = "button" > {
		{
			showDetails ? 'Hide Details' : 'Show Details'
		}
	} <
	/button>
$scope.toggleDetails = function() {
	$scope.showDetails = !$scope.showDetails;
};
//////////////////////////////
