import Loot from "./Loot";
import Monster from "./Monster";
import Stairs from "./Stairs";

const tier3MonsterTable = [
  {
    name: "Demon",
    attack: 3,
    defense: 15,
    damage: 3,
    health: 15,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      x: 336,
      y: 240,
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
      x: 384,
      y: 336,
    },
  },
  {
    name: "Magma Golem",
    attack: 3,
    defense: 15,
    damage: 3,
    health: 15,
    spriteSheet: "heroAtlas",
    spriteSheetCoordinates: {
      x: 432,
      y: 288,
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
      x: 192,
      y: 144,
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
      x: 144,
      y: 432,
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
      x: 96,
      y: 0,
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
      x: 240,
      y: 144,
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
      x: 240,
      y: 240,
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
      x: 144,
      y: 240,
    },
  },
];

const tier3LootTable = [
  {
    name: "Shield Potion",
    class: "shieldCon",
    mod1: 5,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 0,
      y: 528,
    },
  },
  {
    name: "Torch",
    class: "weapon",
    mod1: 2,
    mod2: 1,
    mod3: 3,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 48,
      y: 672,
    },
  },
  {
    name: "Elixir of Health",
    class: "healthCon",
    mod1: 8,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 0,
      y: 480,
    },
  },
  {
    name: "Tome of Fireball",
    class: "tome",
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 48,
      y: 288,
    },
  },
  {
    name: "Magic Helmet",
    class: "head",
    mod1: 3,
    mod2: 2,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 432,
      y: 432,
    },
  },
  {
    name: "Magic Armor",
    class: "torso",
    mod1: 2,
    mod2: 1,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 480,
      y: 432,
    },
  },
  {
    name: "Magic Shield",
    class: "shield",
    mod1: 3,
    mod2: 2,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 288,
      y: 240,
    },
  },
  {
    name: "Magic Axe",
    class: "weapon",
    mod1: 1,
    mod2: 2,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 192,
      y: 144,
    },
  },
];
const tier2LootTable = [
  {
    name: "Torch",
    class: "weapon",
    mod1: 2,
    mod2: 1,
    mod3: 3,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 48,
      y: 672,
    },
  },
  {
    name: "Health Potion",
    class: "healthCon",
    mod1: 5,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 0,
      y: 480,
    },
  },
  {
    name: "Elixir of Health",
    class: "healthCon",
    mod1: 8,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 0,
      y: 480,
    },
  },
  {
    name: "Tome of Fireball",
    class: "tome",
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 48,
      y: 288,
    },
  },
  {
    name: "Long Sword",
    class: "weapon",
    mod1: 1,
    mod2: 2,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 144,
      y: 0,
    },
  },
  {
    name: "Steel Shield",
    class: "shield",
    mod1: 3,
    mod2: 2,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 240,
      y: 288,
    },
  },
  {
    name: "Steel Helmet",
    class: "head",
    mod1: 3,
    mod2: 2,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 432,
      y: 384,
    },
  },
  {
    name: "Steel Armor",
    class: "torso",
    mod1: 2,
    mod2: 1,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 480,
      y: 384,
    },
  },
];
const tier1LootTable = [
  {
    name: "Torch",
    class: "weapon",
    mod1: 2,
    mod2: 1,
    mod3: 3,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 48,
      y: 672,
    },
  },
  {
    name: "Health Potion",
    class: "healthCon",
    mod1: 5,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 0,
      y: 480,
    },
  },
  {
    name: "Health Tincture",
    class: "healthCon",
    mod1: 2,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 0,
      y: 480,
    },
  },
  {
    name: "Tome of Fireball",
    class: "tome",
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 48,
      y: 288,
    },
  },
  {
    name: "Club",
    class: "weapon",
    mod1: 1,
    mod2: 1,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 96,
      y: 672,
    },
  },
  {
    name: "Wooden Shield",
    class: "shield",
    mod1: 2,
    mod2: 1,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 240,
      y: 0,
    },
  },
  {
    name: "Leather Helmet",
    class: "head",
    mod1: 2,
    mod2: 1,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 432,
      y: 96,
    },
  },
  {
    name: "Leather Armor",
    class: "torso",
    mod1: 2,
    mod2: 1,
    spriteSheet: "itemAtlas",
    spriteSheetCoordinates: {
      x: 480,
      y: 96,
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
      currentLootTable = tier1LootTable;
    } else if (this.tier === 2) {
      currentLootTable = tier2LootTable;
    } else if (this.tier === 3) {
      currentLootTable = tier3LootTable;
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
