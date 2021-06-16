import Loot from "./Loot";
import Monster from "./Monster";

const monsterTable = [
  {
    name: "Ghost",
    color: "lightgrey",
    ascii: "👻",
    offset: { x: 0, y: 0 },
    health: 6,
  },
  {
    name: "Wolf",
    color: "gray",
    ascii: "🐕",
    offset: { x: 0, y: 0 },
    health: 3,
  },
  {
    name: "Dragon",
    color: "darkgreen",
    ascii: "🐉",
    offset: { x: 0, y: 0 },
    health: 10,
  },
  {
    name: "Snake",
    color: "green",
    ascii: "🐍",
    offset: { x: 0, y: 0 },
    health: 1,
  },
];

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
    name: "Gold",
    color: "yellow",
    ascii: "💰",
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

  spawnMonsters(spawnCount) {
    this.spawn(spawnCount, () => {
      return new Monster(
        getRandomInt(this.world.width - 1),
        getRandomInt(this.world.height - 1),
        this.world.tilesize,
        monsterTable[getRandomInt(monsterTable.length)]
      );
    });
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default Spawner;
