var socket = io.connect();
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

  $scope.gameBoard= [[[{url:'images/phoecologo.png'}],[],[],[],[],[],[],[]],
                    [[],[],[],[],[],[],[],[]],
                    [[],[],[],[],[],[],[],[]],
                    [[],[],[],[],[],[],[],[]],
                    [[],[],[],[],[],[],[],[]],
                    [[],[],[],[],[],[],[],[]]];

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