import Entity from "./Entity";

class Loot extends Entity {
  action(verb, world) {
    if (verb === "bump") {
      world.addToHistory(world.player.add(this))
      world.remove(this);
    }
  }
}

export default Loot;
