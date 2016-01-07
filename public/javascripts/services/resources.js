/**
 * Created by chottinger on 1/7/16.
 */

angular.module('spookyScarySkeleton').service('resources', [function(){
  var playerOne = {
    life: 30,
    command: 0,
    maxCommand: 0,
    mana: 0,
    maxMana: 0
  };
  var playerTwo = {
    life: 30,
    command: 0,
    maxCommand: 0,
    mana: 0,
    maxMana: 0
  };

  return {
    getResources: function(playerNumber){
      if(playerNumber < 2){
        return playerOne
      } else{
        return playerTwo
      }
    },
    incrementCommand: function(playerNumber){
      if(playerNumber < 2){
        playerOne.maxCommand++;
      } else{
        playerTwo.maxCommand++;
      }
      this.replenishCommand(playerNumber)
    },
    spendCommand: function(amount,playerNumber){
      if(playerNumber < 2){
        playerOne.command -= amount;
        playerOne.maxCommand -= amount;
      } else {
        playerTwo.command -= amount;
        playerTwo.maxCommand -= amount;
      }
    },
    replenishCommand: function(playerNumber){
      if(playerNumber < 2){
        playerOne.command = playerOne.maxCommand;
      } else {
        playerTwo.command = playerTwo.maxCommand;
      }
    },
    restoreCommand: function(amount,playerNumber){
      if(playerNumber < 2){
        playerOne.command += amount;
        playerOne.maxCommand += amount;
      } else {
        playerTwo.command += amount;
        playerTwo.maxCommand += amount;
      }
    },
    incrementMana: function(playerNumber){
      if(playerNumber < 2){
        playerOne.maxMana++;
      } else{
        playerTwo.maxMana++;
      }
      this.replenishMana(playerNumber)
    },
    spendMana: function(amount,playerNumber){
      if(playerNumber < 2){
        playerOne.mana -= amount;
        playerOne.maxMana -= amount;
      } else {
        playerTwo.mana -= amount;
        playerTwo.maxMana -= amount;
      }
    },
    replenishMana: function(playerNumber){
      if(playerNumber < 2){
        playerOne.mana = playerOne.maxMana;
      } else {
        playerTwo.mana = playerTwo.maxMana;
      }
    }
  }
}]);