/**
 * Created by chottinger on 12/13/15.
 */
var app = angular.module('spookyScarySkeleton', ['ng-sortable']);
var socket = io('http://localhost:3000');
app.controller('sortable', ['$scope',function($scope){
    socket.on('response',function(data){
      console.log(data);
    });

    $scope.config = {
      group: 'test',
      sortable: false,
      animation: 300,
      filter: '.disabled',
      onMove: function(evt){
        console.log(evt);
        socket.emit('sort',evt);
      }
    }
  }]);