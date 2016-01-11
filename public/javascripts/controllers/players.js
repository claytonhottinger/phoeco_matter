/**
 * Created by chottinger on 1/8/16.
 */


app.controller('players',['$scope','resources', 'socket', 'error',
  function($scope, resources, socket, error){
  $scope.playerOne = resources.getResources(1);
  socket.authenticate();
  socket.on('isItMyTurn?', function(data){
    $scope.yourTurn = data;
  });
  socket.on('resourceResponse', function(data){
    $scope.playerOne = data;
  });
  $scope.incrementP1Command = function(){
    if(error.getError().code) {
      alert(error.getError().message);
    } else {
      resources.incrementCommand(1);
      $scope.playerOne = resources.getResources(1);
      socket.emit('resource', $scope.playerOne);
    }
  };
  $scope.incrementP1Mana = function(){
    if(error.getError().code) {
      alert(error.getError().message);
    } else {
      resources.incrementMana(1);
      $scope.playerOne = resources.getResources(1);
      socket.emit('resource', $scope.playerOne);
    }
  };


}]);