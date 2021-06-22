import Entity from "./Entity";
import Blood from "./Blood";
import Player from "./Player";
import Spawner from "./Spawner";

const blood = {
  spriteSheet: "terrainAtlas",
  spriteSheetCoordinates: {
    x: 288,
    y: 1680,
  },
};

const tombstone = {
  spriteSheet: "terrainAtlas",
  spriteSheetCoordinates: {
    x: 288,
    y: 1488,
  },
};

function combatRoll(max) {
  return Math.floor(Math.random() * max);
}

let playerAttackRoll = undefined;
let monsterAttackRoll = undefined;
let pAttackMod = playerAttackRoll;
let mAttackMod = monsterAttackRoll;

class Monster extends Entity {
  action(verb, world) {
    if (verb === "fireball") {
      world.addToHistory(
        `${this.attributes.name.toUpperCase()} IS OBLITERATED!`
      );
      world.add(new Blood(this.x, this.y, this.tilesize, blood));
      world.remove(this);
    }

    if (verb === "bump") {
      playerAttackRoll = combatRoll(20);
      pAttackMod = playerAttackRoll += world.player.attributes.attack;

      if (+pAttackMod >= this.attributes.defense) {
        if (playerAttackRoll === 20) {
          world.addToHistory(
            `PLAYER CRITICAL HITS FOR ${
              world.player.attributes.damage * 2
            } DAMAGE!`
          );
          this.attributes.health =
            this.attributes.health - world.player.attributes.damage * 2;
        } else {
          world.addToHistory(
            `Player attacks for ${world.player.attributes.damage} damage`
          );
          this.attributes.health =
            this.attributes.health - world.player.attributes.damage;
        }

        if (this.attributes.health <= 0) {
          world.addToHistory(`${this.attributes.name} dies!`);
          world.add(new Blood(this.x, this.y, this.tilesize, blood));

          let dropRoll = Math.random();
          if (dropRoll < 0.1) {
            let spawner = new Spawner(world);
            spawner.spawnLootAt(this.x, this.y);
          }

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
        if (monsterAttackRoll === 20) {
          world.addToHistory(
            `${this.attributes.name}  CRITICAL HITS FOR ${
              this.attributes.damage * 2
            } DAMAGE!`
          );
          world.player.attributes.health =
            world.player.attributes.health -
            this.attributes.damage * 2 -
            world.player.attributes.armor;
        } else {
          world.addToHistory(
            `${this.attributes.name} attacks for ${this.attributes.damage} damage!`
          );
          world.player.attributes.health =
            world.player.attributes.health -
            this.attributes.damage -
            world.player.attributes.armor;
        }

        if (world.player.attributes.health <= 0) {
          world.addToHistory("You have died");
          world.entities[0].attributes.spriteSheetCoordinates =
            tombstone.spriteSheetCoordinates;
          world.entities[0].attributes.spriteSheet = tombstone.spriteSheet;
          // console.log(world.entities[0]);
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
