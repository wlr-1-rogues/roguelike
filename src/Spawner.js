import Loot from "./Loot";
import Monster from "./Monster";
import Stairs from "./Stairs";

const monsterTable = [
  {
    name: "Rat",
    attack: 1,
    defense: 9,
    damage: 2,
    health: 6,
    flavortext: "It's a ROUS, one of the largest you've ever seen.",
    spriteSheet: 'heroAtlas',
    spriteSheetCoordinates: {
      x: 240,
      y: 0
    }
  },
  {
    name: "Wolf",
    attack: 2,
    defense: 10,
    damage: 2,
    health: 3,
    flavortext: "A direwolf stalks from its lair, bared fangs reflecting your torchlight.",
    spriteSheet: 'heroAtlas',
    spriteSheetCoordinates: {
      x: 288,
      y: 0
    }
  },
  {
    name: "Demon",
    attack: 10,
    defense: 15,
    damage: 6,
    health: 10,
    spriteSheet: 'heroAtlas',
    flavortext: "A massive creature of muscle and flame, shaking the earth with every step.",
    spriteSheetCoordinates: {
      x: 336,
      y: 240
    }
  },
  {
    name: "Snake",
    attack: 2,
    defense: 8,
    damage: 3,
    health: 1,
    flavortext: "A snake thicker than your waist is coiled on the ground, bright purple poison dripping from its fangs.",
    spriteSheet: 'heroAtlas',
    spriteSheetCoordinates: {
      x: 240,
      y: 240
    }
  },
  {
    name: "Goblin",
    attack: 2,
    defense: 8,
    damage: 3,
    health: 1,
    flavortext: "A fat slimy goblin holding a rusted knife.",
    spriteSheet: 'heroAtlas',
    spriteSheetCoordinates: {
      x: 144,
      y: 240
    }
  },
  {
    name: "Banshee",
    attack: 2,
    defense: 8,
    damage: 3,
    health: 1,
    flavortext: "You'd pity the cursed woman if her shrieks weren't forcing you to cover your ears.",
    spriteSheet: 'heroAtlas',
    spriteSheetCoordinates: {
      x: 192,
      y: 144
    }
  },
  {
    name: "Green Dragon",
    attack: 2,
    defense: 8,
    damage: 3,
    health: 1,
    flavortext: "A slender green dragon slithers over the walls, using long claws to maintain its grip.",
    spriteSheet: 'heroAtlas',
    spriteSheetCoordinates: {
      x: 384,
      y: 432
    }
  },
  {
    name: "Blue Dragon",
    attack: 2,
    defense: 8,
    damage: 3,
    health: 1,
    flavortext: "Two bright gouts of flames erupt from its nostrils with every breath.",
    spriteSheet: 'heroAtlas',
    spriteSheetCoordinates: {
      x: 384,
      y: 384
    }
  },
];

const lootTable = [
  {
    name: "Club",
    class: "1h",
    mod1: 1,
    mod2: 1,
    spriteSheet: 'itemAtlas',
    spriteSheetCoordinates: {
      x: 96,
      y: 672
    }
  },
  {
    name: "Long Sword",
    class: "1h",
    mod1: 1,
    mod2: 2,
    spriteSheet: 'itemAtlas',
    spriteSheetCoordinates: {
      x: 144,
      y: 0
    }
  },

  {
    name: "Wooden Shield",
    class: "shield",
    mod1: 2,
    mod2: 1,
    spriteSheet: 'itemAtlas',
    spriteSheetCoordinates: {
      x: 240,
      y: 0
    }
  },
  {
    name: "Steel Shield",
    class: "shield",
    mod1: 3,
    mod2: 2,
    spriteSheet: 'itemAtlas',
    spriteSheetCoordinates: {
      x: 248,
      y: 288
    }
  },
  {
    name: "Leather Helmet",
    class: "shield",
    mod1: 2,
    mod2: 1,
    spriteSheet: 'itemAtlas',
    spriteSheetCoordinates: {
      x: 432,
      y: 96
    }
  },
  {
    name: "Steel Helmet",
    class: "shield",
    mod1: 3,
    mod2: 2,
    spriteSheet: 'itemAtlas',
    spriteSheetCoordinates: {
      x: 432,
      y: 384
    }
  },
  {
    name: "Leather Chest",
    class: "shield",
    mod1: 2,
    mod2: 1,
    spriteSheet: 'itemAtlas',
    spriteSheetCoordinates: {
      x: 480,
      y: 96
    }
  },
  {
    name: "Steel Chest",
    class: "shield",
    mod1: 2,
    mod2: 1,
    spriteSheet: 'itemAtlas',
    spriteSheetCoordinates: {
      x: 480,
      y: 384
    }
  },
  {
    name: "Torch",
    class: "shield",
    mod1: 2,
    mod2: 1,
    spriteSheet: 'itemAtlas',
    spriteSheetCoordinates: {
      x: 48,
      y: 672
    }
  },
  {
    name: "Health Potion",
    class: "health",
    mod1: 5,
    spriteSheet: 'itemAtlas',
    spriteSheetCoordinates: {
      x: 0,
      y: 480
    }
  },
  {
    name: "Shield Potion",
    class: "health",
    mod1: 5,
    spriteSheet: 'itemAtlas',
    spriteSheetCoordinates: {
      x: 0,
      y: 528
    }
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
