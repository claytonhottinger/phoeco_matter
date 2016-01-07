var socket = io.connect();
var gameBoardWidth = 8;
var gameBoardHeight = 6;

angular.module('spookyScarySkeleton').controller('game', ['$scope','resources', function($scope, resources){
  /**
   * When the server sends the gamestate (via web sockets) to a client, if it is not in an error state, update the gameboard
   */
  socket.on('response',function(data){
    if($scope.error != 0) {
      $scope.gameBoard = data;
      $scope.$apply();
    }
  });
  /**
   * When the server sends an error, update the DOM and error code
   */
  socket.on('oops', function(data){
    $scope.error = data.code;
    console.log(data.code);
    $scope.errMessage = data.message;
    $scope.$apply();
  });
  /**
   * Call the function to generate the array of arrays that represent the gameboard,
   * place a card in the top left corner
   */
  $scope.gameBoard = generateGameBoard(gameBoardHeight, gameBoardWidth);

  $scope.gameBoard[0][0]= [{url:'images/phoecologo.png'}];

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