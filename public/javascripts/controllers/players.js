/**
 * Created by chottinger on 1/8/16.
 */


app.controller('players',['$scope','resources', 'socket', function($scope, resources, socket){
  $scope.playerOne = resources.getResources(1);
  socket.on('resourceResponse', function(data){
    $scope.playerOne = data;
  });
  $scope.incrementP1Command = function(){
    resources.incrementCommand(1);
    $scope.playerOne = resources.getResources(1);
    socket.emit('resource', $scope.playerOne);
  };
  $scope.incrementP1Mana = function(){
    resources.incrementMana(1);
    $scope.playerOne = resources.getResources(1);
    socket.emit('resource', $scope.playerOne);
  };


}]);