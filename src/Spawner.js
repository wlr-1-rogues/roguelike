import Loot from "./Loot";
import Monster from "./Monster";
import Stairs from "./Stairs";

const monsterTable = [
  {
    name: "Ghost",
    color: "lightgrey",
    ascii: "👻",
    offset: { x: 0, y: 0 },
    attack: 1,
    defense: 9,
    damage: 2,
    health: 6,
    type: "monster",
  },
  {
    name: "Wolf",
    color: "gray",
    ascii: "🐕",
    offset: { x: 0, y: 0 },
    attack: 2,
    defense: 10,
    damage: 2,
    health: 3,
    type: "monster",
  },
  {
    name: "Dragon",
    color: "darkgreen",
    ascii: "🐉",
    offset: { x: 0, y: 0 },
    attack: 4,
    defense: 15,
    damage: 4,
    health: 10,
    type: "monster",
  },
  {
    name: "Snake",
    color: "green",
    ascii: "🐍",
    offset: { x: 0, y: 0 },
    attack: 2,
    defense: 8,
    damage: 3,
    health: 1,
    type: "monster",
  },
];

const lootTable = [
  {
    name: "Long Sword",
    color: "darkgrey",
    ascii: "🗡️",
    offset: { x: 0, y: 0 },
    class: "1h",
    mod1: 1,
    mod2: 2,
    type: "loot",
  },
  {
    name: "Great Sword",
    color: "darkgrey",
    ascii: "🗡️",
    offset: { x: 0, y: 0 },
    class: "2h",
    mod1: 1,
    mod2: 4,
    type: "loot",
  },
  {
    name: "Health Potion",
    color: "red",
    ascii: "🧪",
    offset: { x: 0, y: 0 },
    class: "health",
    mod1: 5,
    type: "loot",
  },
  {
    name: "Gold",
    color: "yellow",
    ascii: "💰",
    offset: { x: 0, y: 0 },
    class: "gold",
    mod1: 1,
    type: "loot",
  },
  {
    name: "Buckler",
    color: "lightgrey",
    ascii: "🛡️",
    offset: { x: 0, y: 0 },
    class: "shield",
    mod1: 2,
    mod2: 1,
    type: "loot",
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

  spawnStairs() {
    let stairs = new Stairs(
      this.world.width - 10,
      this.world.height - 10,
      this.world.tilesize
    );
    this.world.add(stairs);
    this.world.moveToSpace(stairs);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default Spawner;
