import Entity from "./Entity";
import Spawner from "./Spawner";

class Chest extends Entity {
  constructor(x, y, size, attributes, mimic = false) {
    super(x, y, size, attributes)
    this.mimic = mimic;
  }
  action(verb, world) {
    if (verb === "bump") {
      let spawner = new Spawner(world);
      if(this.mimic === true) {
        world.remove(this);
        spawner.spawnMimic(this.x, this.y)
        return;
      }
      spawner.spawnChestLootAt(this.x, this.y);
      world.remove(this);
    }

    if (verb === "fireball") {
      world.remove(this);
    }
  }
}

export default Chest;
