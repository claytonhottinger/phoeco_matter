var gameBoardWidth = 8;
var gameBoardHeight = 6;

app.controller('game', ['$scope','resources', 'socket', 'error',
  function($scope, resources, socket, error){

  /**
   * When the server sends the gamestate (via web sockets) to a client, if it is not in an error state, update the gameboard
   */

  socket.on('response',function(data){
    if(error.getError().code != 2) {
      $scope.gameBoard = data;
    }
  });

  /**
   * Call the function to generate the array of arrays that represents the gameboard,
   *
   */
  $scope.gameBoard = generateGameBoard(gameBoardHeight, gameBoardWidth);

  /**
   * Configuration object for ng-sortable
   * When a card is added to a div (when it's moved), send the new game state to the server
   */
  $scope.config = {
    group: 'test',
    sortable: false,
    animation: 300,
    filter: '.disabled',
    onAdd: function(evt){
      console.log(evt);
      socket.emit('sort',$scope.gameBoard);
    }
  }
}]);
/**
 * Generates an array of empty arrays based on the entered parameters
 * @param height
 * @param width
 * @returns {Array}
 */
function generateGameBoard (height, width) {
  var arrayOfArrays = [];
  for(var i = 0; i<height; i++){
    var row = [];
    for(var j = 0; j<width; j++){
      row.push([]);
    }
    arrayOfArrays.push(row);
  }
  return arrayOfArrays;
}