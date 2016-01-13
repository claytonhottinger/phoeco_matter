/**
 * Created by chottinger on 1/8/16.
 */

/**
 * factory for all clientside socket uses
 * @param $rootScope allows for DOM to be updated when socket callbacks are executed
 */
app.factory('socket',['$rootScope', function($rootScope){
  //initialize socket io object
  var socket = io.connect();
  return {
    /**following methods are returned, imitating the corresponding socket io methods when injected into a controller
     *@param eventName is the name of the socket event being listened for or emitted
     * @param callback is the callback function to execute
     */
    on: function(eventName, callback) {
      socket.on(eventName, function(){
        //arguments is an object that represents any parameters passed in this callback function
        var args = arguments;
        //$rootScope.$apply forces angular to update the DOM (on all scopes)
        $rootScope.$apply(function(){
          //callback.apply gives the callback function (parameter from above) access to the socket.io object
          //and the arguments object
          callback.apply(socket, args);
        });
      });
    },
    emit: function(eventName, data, callback){
      socket.emit(eventName, data, function(){
        var args = arguments;
        $rootScope.$apply(function(){
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    },
    id: function(){
      return socket.id;
    },
    authenticate: function(){
      socket.emit('isItMyTurn?');
    }
  }
}]);