import Entity from "./Entity.js";
import Spawner from "./Spawner.js";
import StairSound from './assets/sounds/stairs.mp3'

const stairSound = new Audio(StairSound)

class Stairs extends Entity {
  attributes = {
    spriteSheet: "terrainAtlas",
    spriteSheetCoordinates: {
      x: 432,
      y: 96,
    },
  };

  action(verb, world) {
    if (verb === "bump") {
      stairSound.play()
      world.addToHistory("You move down the stairs...");
      world.tier += 1;
      if (world.tier > 3) {
        //spawn boss room here
        world.tier = "boss";
        world.addToHistory("You suddenly feel a sense of impending doom...");
        world.createBossMap();
        world.player.x = 0;
        world.player.y = 0;
        world.moveToSpace(world.player);
        world.player.attributes.sightRadius = 80;
        world.entities = world.entities.filter((e) => e === world.player);
        let spawner = new Spawner(world);
        spawner.spawnBoss();
        return;
      }
      world.addToHistory(`LEVEL ${world.tier}`);
      world.createCellularMap();
      world.player.x = 0;
      world.player.y = 0;
      world.moveToSpace(world.player);
      world.entities = world.entities.filter((e) => e === world.player);
      let spawner = new Spawner(world);
      spawner.spawnLoot();
      spawner.spawnMonsters(100);
      spawner.spawnStairs();
    }
  }
}

export default Stairs;
