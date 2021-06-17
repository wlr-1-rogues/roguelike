import Entity from "./Entity";

function combatRoll(max){
  return Math.floor(Math.random() * max)
}

let playerAttackRoll = undefined
let monsterAttackRoll = undefined
let pAttackMod = playerAttackRoll
let mAttackMod = monsterAttackRoll

class Monster extends Entity {


  action(verb, world) {
    if (verb === "bump") {
      world.addToHistory(`Player attacks ${this.attributes.name}!`);
      
      playerAttackRoll = combatRoll(20);
      monsterAttackRoll = combatRoll(20);
      
            console.log('player base attack', world.player.attributes.attack)
            console.log('monster base attack', this.attributes.attack)
            console.log('player attack roll', playerAttackRoll)
            console.log('monster attack roll', monsterAttackRoll)

      pAttackMod = playerAttackRoll += world.player.attributes.attack
      mAttackMod = monsterAttackRoll += this.attributes.attack

            console.log('player attack with modifier', pAttackMod)
            console.log('monster attack with modifier', mAttackMod)
      
      
      if(+pAttackMod >= this.attributes.defense){
        world.addToHistory(`Player attacks for ${world.player.attributes.damage}`)
        this.attributes.health = this.attributes.health - world.player.attributes.damage;
        if (this.attributes.health <= 0) {
          world.addToHistory(`${this.attributes.name} dies!`);
          world.remove(this);
          return

        } else {
          world.addToHistory(`${this.attributes.name} has ${this.attributes.health} health remaining!`);
        }
      }else{
        world.addToHistory("Your attack missed!")
                
      }

      world.addToHistory(`${this.attributes.name} attacks Player!`)
      
      if(+mAttackMod >= world.player.attributes.defense){
        world.addToHistory(`${this.attributes.name} attacks for ${this.attributes.damage} damage!`)
        world.player.attributes.health = world.player.attributes.health - this.attributes.damage - world.player.attributes.armor;

        if (world.player.attributes.health <= 0) {
          world.addToHistory("You have died");
                  
        } else {
          world.addToHistory(`You have ${world.player.attributes.health} health remaining!`);
        }
            
      }else{
        world.addToHistory(`${this.attributes.name}'s attack missed!`)
      }
      return;
    }
  }
}

export default Monster;
