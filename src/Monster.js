import Entity from "./Entity";

function combatRoll(max) {
  return Math.floor(Math.random() * max);
}

let playerAttackRoll = undefined;
let monsterAttackRoll = undefined;
let pAttackMod = playerAttackRoll;
let mAttackMod = monsterAttackRoll;

class Monster extends Entity {
  action(verb, world) {
    if (verb === "bump") {
      playerAttackRoll = combatRoll(20);
      pAttackMod = playerAttackRoll += world.player.attributes.attack;

      if (+pAttackMod >= this.attributes.defense) {
        world.addToHistory(
          `Player attacks for ${world.player.attributes.damage}`
        );
        this.attributes.health =
          this.attributes.health - world.player.attributes.damage;
        if (this.attributes.health <= 0) {
          world.addToHistory(`${this.attributes.name} dies!`);
          world.remove(this);
          return;
        } else {
          world.addToHistory(
            `${this.attributes.name} has ${this.attributes.health} health remaining!`
          );
        }
      } else {
        world.addToHistory("Your attack missed!");
      }
    }
    if (verb === "monsterBump") {
      monsterAttackRoll = combatRoll(20);
      mAttackMod = monsterAttackRoll += this.attributes.attack;

      world.addToHistory(`${this.attributes.name} attacks Player!`);

      if (+mAttackMod >= world.player.attributes.defense) {
        world.addToHistory(
          `${this.attributes.name} attacks for ${this.attributes.damage} damage!`
        );
        world.player.attributes.health =
          world.player.attributes.health -
          this.attributes.damage -
          world.player.attributes.armor;

        if (world.player.attributes.health <= 0) {
          world.addToHistory("You have died");
        } else {
          world.addToHistory(
            `You have ${world.player.attributes.health} health remaining!`
          );
        }
      } else {
        world.addToHistory(`${this.attributes.name}'s attack missed!`);
      }
    }
  }
}

export default Monster;
