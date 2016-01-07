var socket = io.connect();
var gameBoardWidth = 8;
var gameBoardHeight = 6;

app.controller('game', ['$scope', function($scope){



  socket.on('response',function(data){
    if($scope.error != 0) {
      $scope.gameBoard = data;
      $scope.$apply();
    }
  });

  socket.on('oops', function(data){
    $scope.error = data.code;
    console.log(data.code);
    $scope.errMessage = data.message;
    $scope.$apply();
  });

  $scope.gameBoard = generateGameBoard(gameBoardHeight, gameBoardWidth);

  $scope.gameBoard[0][0]= [{url:'images/phoecologo.png'}];

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

function increaseResource (resource) {
  resource++;


}