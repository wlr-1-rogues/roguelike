import Entity from "./Entity";
import Spawner from "./Spawner";

class Chest extends Entity {
  action(verb, world) {
    if (verb === "bump") {
      let spawner = new Spawner(world);
      spawner.spawnLootAt(this.x, this.y);
      world.remove(this);
    }

    if (verb === "fireball") {
      world.remove(this);
    }
  }
}

export default Chest;
