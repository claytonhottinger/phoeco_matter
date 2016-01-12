/**
 * Created by chottinger on 1/11/16.
 */
app.factory('error', function(){
  var errorCode = 0;
  var errorMessage = ['',
    'Please wait for your turn to begin',
    'Sorry, the room is full right now',
    'You\'ve not enough resources'];
  return {
    getError: function (){
      return {code: errorCode, message: errorMessage[errorCode]};
    },
    setError: function(code){
      errorCode = code;
    }
  }
});