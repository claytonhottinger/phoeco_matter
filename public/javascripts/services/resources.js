/**
 * Created by chottinger on 1/7/16.
 */

/**
 * Service for managing resources. Stores two objects that represent each player's resource totals
 * Provides several methods for incrementing and spending those resources, using
 * @param playerNumber to determine whose resources to affect
 */

app.factory('resources', [function(){
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
      } else {
        playerTwo.mana -= amount;
      }
    },
    replenishMana: function(playerNumber){
      if(playerNumber < 2){
        playerOne.mana = playerOne.maxMana;
      } else {
        playerTwo.mana = playerTwo.maxMana;
      }
    },
    checkCosts: function(card, playerNumber){
      if(playerNumber < 2){
        return card.command <= playerOne.command && card.mana <= playerOne.mana
      } else {
        return card.command <= playerTwo.command && card.mana <= playerTwo.mana
      }
    }
  }
}]);