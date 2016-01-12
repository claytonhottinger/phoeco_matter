/**
 * Created by chottinger on 1/8/16.
 */


app.controller('players',['$scope','resources', 'socket', 'error',
  function($scope, resources, socket, error){
  $scope.playerOne = resources.getResources(1);

  socket.on('p1HandResponse', function(data){
    $scope.playerOneHand = data;
    //$scope.playerOneHand.forEach($scope.isPlayable);
  });


  $scope.handConfig = {
    group: {name:'test', put: false},
    sortable: false,
    animation: 300,
    filter: '.not',
    onRemove: function(evt){
      resources.spendCommand(evt.model.command, 1);
      resources.spendMana(evt.model.mana, 1);
      $scope.playerOne = resources.getResources(1);
    }
  };

  socket.on('resourceResponse', function(data){
    $scope.playerOne = data;
  });

  $scope.incrementP1Command = function(){
    if(error.getError().code == 1) {
      alert(error.getError().message);
    } else {
      resources.incrementCommand(1);
      $scope.playerOne = resources.getResources(1);
      socket.emit('resource', $scope.playerOne);
    }
  };

  $scope.incrementP1Mana = function(){
    if(error.getError().code == 1) {
      alert(error.getError().message);
    } else {
      resources.incrementMana(1);
      $scope.playerOne = resources.getResources(1);
      socket.emit('resource', $scope.playerOne);
    }
  };

  $scope.isPlayable = function(card){
    if(error.getError().code == 1) {
      alert(error.getError().message)
    } else if (resources.checkCosts(card, 1)) {
      card.playable = 'playable';
    } else {
      error.setError(3);
      alert(error.getError().message);
    }
  }


}]);


