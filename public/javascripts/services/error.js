/**
 * Created by chottinger on 1/11/16.
 */
app.factory('error', function(){
  var errorCode = 0;
  var errorMessage = ['',
    'Please wait for your turn to begin',
    'Sorry, the room is full right now',
    'You\'ve not enough resources',
    'Card must be played to your home row',
    'Card lacks the movement points to move that far'];
  return {
    getError: function (){
      return {code: errorCode, message: errorMessage[errorCode]};
    },
    setError: function(code){
      errorCode = code;
    }
  }
});