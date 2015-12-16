/**
 * Created by chottinger on 12/13/15.
 */
var app = angular.module('spookyScarySkeleton', ['ng-sortable']);
//var host =
var socket = io.connect();
app.controller('sortable', ['$scope',function($scope){
    socket.on('response',function(data){
      console.log(data);
      $scope.gameBoard=data;
    });

    $scope.gameBoard=[[[{url:'images/phoecologo.png'}],[],[],[],[]]];

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