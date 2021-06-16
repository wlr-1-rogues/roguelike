import Loot from "./Loot";

const lootTable = [
  {
    name: "Long Sword",
    color: "darkgrey",
    ascii: "🗡️",
    offset: { x: 0, y: 0 },
  },
  {
    name: "Health Potion",
    color: "red",
    ascii: "🧪",
    offset: { x: 0, y: 0 },
  },
  {
    name: "Gold Coin",
    color: "yellow",
    ascii: "🪙",
    offset: { x: 0, y: 0 },
  },
  {
    name: "Armor",
    color: "lightgrey",
    ascii: "🛡️",
    offset: { x: 0, y: 0 },
  },
];

class Spawner {
  constructor(world) {
    this.world = world;
  }
  spawn(spawnCount, createEntity) {
    for (let count = 0; count < spawnCount; count++) {
      let entity = createEntity();
      this.world.add(entity);
      this.world.moveToSpace(entity);
    }
  }

  spawnLoot(spawnCount) {
    this.spawn(spawnCount, () => {
      return new Loot(
        getRandomInt(this.world.width - 1),
        getRandomInt(this.world.height - 1),
        this.world.tilesize,
        lootTable[getRandomInt(lootTable.length)]
      );
    });
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default Spawner;
