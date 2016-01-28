/**
 * Created by chottinger on 1/8/16.
 */

/**
 * controller for everything not on the gameboard
 */

app.controller('players',['$scope','resources', 'socket', 'error',
  function($scope, resources, socket, error){
  //gets the resource object from the service for use on the scope
  $scope.playerOne = resources.getResources(1);

  //updates resources when the server has validated a card played from the hand
  socket.on('newCardResponse', function(data){
    resources.spendCommand(data.command, 1);
    resources.spendMana(data.mana, 1);
    //reset the scope's resource variable
    $scope.playerOne = resources.getResources(1);
    socket.emit('resource', $scope.playerOne);
  });

  //when the server sends the player's hand, store it on the scope for display
  socket.on('p1HandResponse', function(data){
    $scope.playerOneHand = data;
  });

  //hand config object for sortable.js.
  $scope.handConfig = {
    //same group name to keep drag and drop between hand and board, disable dragging to the hand
    group: {name:'test', put: false},
    sortable: false,
    animation: 300,
    //filter is a selector used to disable click and drag on objects with the "not" class
    filter: '.not'
  };

  //update the scope when the server sends a resource update to the client
  socket.on('resourceResponse', function(data){
    resources.setResources(1, data);
    $scope.playerOne = resources.getResources(1);
  });

  //If the client is the active player, use the resource service to increment the command, update the scope, and send
  //the new resources to the server for relay to the other client. Alert an error message otherwise
  $scope.incrementP1Command = function(){
    resources.incrementCommand(1);
    $scope.playerOne = resources.getResources(1);
    socket.emit('resource', $scope.playerOne);
  };
  //Same as above, except for mana
  $scope.incrementP1Mana = function(){
    resources.incrementMana(1);
    $scope.playerOne = resources.getResources(1);
    socket.emit('resource', $scope.playerOne);
  };

  //function that takes in a card object and determines if the player has enough resources to play that card
  //If so, the card's playable property (the element's class) will be changed from 'not' (the sortable.js filter),
  // allowing it to be dragged from the hand. If the card is not playable or it is not that player's turn, fire an alert
  $scope.isPlayable = function(card){
    //socket.emit('cardPlayable', card);
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


