import { findRenderedComponentWithType } from "react-dom/test-utils";
import Loot from "./Loot";
import Monster from "./Monster";
import Stairs from "./Stairs";


const globalLoot = [
  {
    name: "Torch",
    class: "weapon",
    mod1: 1,
    mod2: 0,
    mod3: 3,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 48,
      x: 672,
    },
  },
  {
    name: "Health Tincture",
    class: "healthCon",
    mod1: 2,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 48,
      x: 816,
    },
  },
  {
    name: "Health Potion",
    class: "healthCon",
    mod1: 5,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 0,
      x: 480,
    },
  },
  {
    name: "Elixir of Health",
    class: "healthCon",
    mod1: 8,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 384,
      x: 336,
    },
  },
  {
    name: "Holy Tonic",
    class: "armorCon",
    mod1: 3,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 0,
      x: 528,
    },
  },
  {
    name: "Tome of Fireball",
    class: "tome",
    mod1: 10,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 48,
      x: 288,
    },
  },
]

const tier3MonsterTable = [
  {
    name: "Demon",
    attack: 3,
    defense: 15,
    damage: 3,
    health: 15,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 336,
      x: 240,
    },
  },
  {
    name: "Dragon",
    attack: 3,
    defense: 15,
    damage: 3,
    health: 15,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 384,
      x: 336,
    },
  },
  {
    name: "Golem",
    attack: 3,
    defense: 15,
    damage: 3,
    health: 15,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 432,
      x: 288,
    },
  },
];

const tier2MonsterTable = [
  {
    name: "Banshee",
    attack: 2,
    defense: 10,
    damage: 2,
    health: 10,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 192,
      x: 144,
    },
  },
  {
    name: "Ogre",
    attack: 2,
    defense: 10,
    damage: 2,
    health: 10,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 144,
      x: 432,
    },
  },
  {
    name: "Torturer",
    attack: 2,
    defense: 10,
    damage: 2,
    health: 10,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 96,
      x: 0,
    },
  },
];

const tier1MonsterTable = [
  {
    name: "Zombie",
    attack: 1,
    defense: 5,
    damage: 1,
    health: 5,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 240,
      x: 144,
    },
  },
  {
    name: "Snake",
    attack: 1,
    defense: 5,
    damage: 1,
    health: 5,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 240,
      x: 240,
    },
  },
  {
    name: "Goblin",
    attack: 1,
    defense: 5,
    damage: 1,
    health: 5,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      y: 144,
      x: 240,
    },
  },
];

const tier3LootTable = [
  {
    name: "Magic Helmet",
    class: "head",
    mod1: 3,
    mod2: 3,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 432,
      x: 432,
    },
  },
  {
    name: "Magic Armor",
    class: "torso",
    mod1: 4,
    mod2: 3,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 480,
      x: 432,
    },
  },
  {
    name: "Magic Shield",
    class: "shield",
    mod1: 4,
    mod2: 3,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 240,
      x: 816,
    },
  },
  {
    name: "Magic Axe",
    class: "weapon",
    mod1: 3,
    mod2: 4,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 192,
      x: 144,
    },
  },
];
const tier2LootTable = [
  {
    name: "Long Sword",
    class: "weapon",
    mod1: 2,
    mod2: 2,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 144,
      x: 0,
    },
  },
  {
    name: "Steel Shield",
    class: "shield",
    mod1: 2,
    mod2: 2,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 240,
      x: 288,
    },
  },
  {
    name: "Steel Helmet",
    class: "head",
    mod1: 2,
    mod2: 2,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 432,
      x: 384,
    },
  },
  {
    name: "Steel Armor",
    class: "torso",
    mod1: 3,
    mod2: 2,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 480,
      x: 384,
    },
  },
];
const tier1LootTable = [
  {
    name: "Dagger",
    class: "weapon",
    mod1: 1,
    mod2: 1,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 96,
      x: 96,
    },
  },
  {
    name: "Wooden Shield",
    class: "shield",
    mod1: 1,
    mod2: 1,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 240,
      x: 0,
    },
  },
  {
    name: "Leather Helmet",
    class: "head",
    mod1: 1,
    mod2: 1,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 432,
      x: 96,
    },
  },
  {
    name: "Leather Armor",
    class: "torso",
    mod1: 1,
    mod2: 2,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      y: 480,
      x: 96,
    },
  },
];

class Spawner {
  constructor(world) {
    this.world = world;
    this.tier = world.tier;
  }
  spawn(spawnCount, createEntity) {
    for (let count = 0; count < spawnCount; count++) {
      let entity = createEntity();
      this.world.add(entity);
      this.world.moveToSpace(entity);
    }
  }

  spawnLoot(spawnCount) {
    let currentLootTable = [];
    if (this.tier === 1) {
      currentLootTable = [...tier1LootTable, ...globalLoot];
    } else if (this.tier === 2) {
      currentLootTable = [...tier2LootTable, ...globalLoot];
    } else if (this.tier === 3) {
      currentLootTable = [...tier3LootTable, ...globalLoot];
    }

    this.spawn(spawnCount, () => {
      return new Loot(
        getRandomInt(this.world.width - 1),
        getRandomInt(this.world.height - 1),
        this.world.tilesize,
        currentLootTable[getRandomInt(currentLootTable.length)]
      );
    });
  }

  spawnLootAt(x, y) {
    let currentLootTable = [];
    if (this.tier === 1) {
      currentLootTable = [...tier1LootTable, ...globalLoot];
    } else if (this.tier === 2) {
      currentLootTable = [...tier2LootTable, ...globalLoot];
    } else if (this.tier === 3) {
      currentLootTable = [...tier3LootTable, ...globalLoot];
    }

    let loot = new Loot(
      x,
      y,
      this.world.tilesize,
      currentLootTable[getRandomInt(currentLootTable.length)]
    );
    this.world.add(loot);
    this.world.moveDropToSpace(loot);
  }

  spawnMonsters(spawnCount) {
    console.log("spawning", this.tier);

    let currentMonsterTable = [];
    if (this.tier === 1) {
      currentMonsterTable = tier1MonsterTable;
    } else if (this.tier === 2) {
      currentMonsterTable = tier2MonsterTable;
    } else if (this.tier === 3) {
      currentMonsterTable = tier3MonsterTable;
    }

    this.spawn(spawnCount, () => {
      return new Monster(
        getRandomInt(this.world.width - 1),
        getRandomInt(this.world.height - 1),
        this.world.tilesize,
        currentMonsterTable[getRandomInt(currentMonsterTable.length)]
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
