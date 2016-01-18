/**
 * Created by chottinger on 1/11/16.
 */
app.controller('errorController', ['$scope','error','socket', function($scope, error, socket){
  $scope.error = error.getError();
  /**
   * When the server sends an error, update the DOM and error code
   */
  socket.on('oops', function(data){
    error.setError(data);
    $scope.error = error.getError();
    alert($scope.error.message);
    //$mdToast.show(
    //  $mdToast.simple()
    //    .textContent($scope.error.message)
    //    .position('top right')
    //    .hideDelay(3000)
    //);
  });
}]);