import Entity from "./Entity.js";
import Spawner from "./Spawner.js";

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
      world.addToHistory("You move up the ladder...");
      world.createCellularMap();
      world.player.x = 0;
      world.player.y = 0;
      world.moveToSpace(world.player);
      world.entities = world.entities.filter((e) => e === world.player);
      let spawner = new Spawner(world);
      spawner.spawnLoot(10);
      spawner.spawnMonsters(6);
      spawner.spawnStairs();
    }
  }
}

export default Stairs;
