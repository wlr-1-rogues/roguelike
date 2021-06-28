import { Map, FOV, Path } from "rot-js";
import Blood from "./Blood";
import Entity from "./Entity";
import Fireball from "./Fireball";
import Loot from "./Loot";
import Monster from "./Monster";
import Player from "./Player";
import Blastwave from "./Blastwave";

const blastwave = {
  name: "blastwave",
  spriteSheet: "fxAtlas",
  spriteSheetCoordinates: {
    x: 72,
    y: 24,
  },
};

const hit = [
  {
    name: "hit",
    spriteSheet: "fxAtlas",
    spriteSheetCoordinates: {
      x: 168,
      y: 144,
    },
  },
  {
    name: "hit",
    spriteSheet: "fxAtlas",
    spriteSheetCoordinates: {
      x: 192,
      y: 144,
    },
  },
];

class World {
  constructor(width, height, tilesize, atlases, tier) {
    this.width = width;
    this.height = height;
    this.tilesize = tilesize;
    this.atlases = atlases;
    this.tier = tier;
    this.entities = [new Player(0, 0, 24)];
    this.history = ["You enter the dungeon", "---", `LEVEL ${tier}`, "---"];
    this.visibleMonsters = new Set([]);
    this.worldmap = new Array(this.width);
    for (let x = 0; x < this.width; x++) {
      this.worldmap[x] = new Array(this.height);
    }

    this.lastHit = { x: 0, y: 0 };
    this.didHit = false;

    this.fov = new FOV.RecursiveShadowcasting(this.lightPasses.bind(this));
  }

  lightPasses(x, y) {
    if (x >= 0 && y >= 0 && y < this.height && x < this.width) {
      if (this.worldmap[x][y] === 0) {
        return true;
      }
    }

    return false;
  }

  isPassable(x, y) {
    if (this.worldmap[x][y] === 0) {
      return true;
    }
    return false;
  }

  createCellularMap() {
    let map = new Map.Cellular(this.width, this.height, { connected: true });
    map.randomize(0.5);
    let userCallback = (x, y, value) => {
      if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
        this.worldmap[x][y] = 1; //creates walls on edges
        return;
      }
      this.worldmap[x][y] = value === 0 ? 1 : 0;
    };

    map.create(userCallback);
    map.connect(userCallback, 1);
  }

  createBossMap() {
    let map = new Map.Cellular(this.width, this.height, { connected: true });
    map.randomize(1);
    let userCallback = (x, y, value) => {
      if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
        this.worldmap[x][y] = 1; //creates walls on edges
        return;
      }
      this.worldmap[x][y] = value === 0 ? 1 : 0;
    };

    map.create(userCallback);
    map.connect(userCallback, 1);
  }

  add(entity) {
    if (entity instanceof Fireball) {
      this.entities.splice(1, 0, entity);
    } else if (entity instanceof Blastwave) {
      this.entities.splice(1, 0, entity);
    } else {
      this.entities.push(entity);
    }
  }

  remove(entity) {
    this.entities = this.entities.filter((e) => e !== entity);
  }

  moveToSpace(entity) {
    for (let x = entity.x; x < this.width; x++) {
      for (let y = entity.y; y < this.height; y++) {
        if (this.worldmap[x][y] === 0 && !this.getEntityAtLocation(x, y)) {
          entity.x = x;
          entity.y = y;
          return;
        }
      }
    }
  }

  moveDropToSpace(entity) {
    let offsets = [-1, 1];
    let x = entity.x;
    let y = entity.y;

    let xOffset = offsets[Math.floor(Math.random() * Math.floor(2))];
    let yOffset = offsets[Math.floor(Math.random() * Math.floor(2))];

    if (
      this.worldmap[x + xOffset][y + yOffset] === 0 &&
      !this.getEntityAtLocation(x + xOffset, y + yOffset)
    ) {
      entity.x = x + xOffset;
      entity.y = y + yOffset;
      return;
    } else {
      xOffset = offsets[Math.floor(Math.random() * Math.floor(2))];
      yOffset = offsets[Math.floor(Math.random() * Math.floor(2))];
      if (
        this.worldmap[x + xOffset][y + yOffset] === 0 &&
        !this.getEntityAtLocation(x + xOffset, y + yOffset)
      ) {
        entity.x = x + xOffset;
        entity.y = y + yOffset;
        return;
      } else {
        return this.moveToSpace(entity);
      }
    }
  }

  isWall(x, y) {
    return (
      this.worldmap[x] === undefined ||
      this.worldmap[y] === undefined ||
      this.worldmap[x][y] === 1
    );
  }

  get player() {
    return this.entities[0];
  }

  getEntityAtLocation(x, y) {
    return this.entities.find((entity) => entity.x === x && entity.y === y);
  }

  inspectItem(itemIndex) {
    let tempPlayer = this.player.copyPlayer();
    tempPlayer.inspect(itemIndex) &&
      this.addToHistory(tempPlayer.inspect(itemIndex));
  }

  equipItem() {
    let tempPlayer = this.player.copyPlayer();
    this.addToHistory(tempPlayer.equip());
  }

  inspectEquip(item) {
    let tempPlayer = this.player.copyPlayer();
    tempPlayer.inspectE(item) && this.addToHistory(tempPlayer.inspectE(item));
  }

  unequipItem() {
    let tempPlayer = this.player.copyPlayer();
    this.addToHistory(tempPlayer.unequip());
  }

  castSpell() {
    let tempPlayer = this.player.copyPlayer();
    this.addToHistory(tempPlayer.cast());
  }

  dropItem() {
    let tempPlayer = this.player.copyPlayer();
    this.addToHistory(tempPlayer.drop());
  }

  rest() {
    this.removeHit();
    this.addToHistory("you give yourself a moment to rest");
  }

  moveProjectiles() {
    this.entities.forEach((entity) => {
      if (entity instanceof Blastwave) {
        this.remove(entity);
      }

      if (entity instanceof Fireball) {
        let tempFireball = entity.copyFireball();
        let direction = tempFireball.fireDirection;

        const handleExplosion = (x, y) => {
          // newLocationEntity.action("fireball", this);
          let startX = x - 1;
          let startY = y + 1;
          let endX = x + 2;
          let endY = y - 2;

          this.add(new Blastwave(x - 1, y - 1, this.tilesize, blastwave));

          for (let xCoord = startX; xCoord < endX; xCoord++) {
            for (let yCoord = startY; yCoord > endY; yCoord--) {
              let explodingEntity = this.getEntityAtLocation(xCoord, yCoord);
              if (explodingEntity && !(explodingEntity instanceof Blood)) {
                explodingEntity.action("fireball", this);
              }

              if (this.isWall(xCoord, yCoord)) {
                if (
                  xCoord >= 0 &&
                  yCoord >= 0 &&
                  yCoord < this.height &&
                  xCoord < this.width
                )
                  this.worldmap[xCoord][yCoord] = 0;
              }
            }
          }
        };

        if (direction === "up") {
          tempFireball.y -= 1;
          let newLocationEntity = this.getEntityAtLocation(
            tempFireball.x,
            tempFireball.y
          );
          if (newLocationEntity && !(newLocationEntity instanceof Blood)) {
            this.remove(entity);
            handleExplosion(newLocationEntity.x, newLocationEntity.y);
            return;
          }

          if (this.isWall(tempFireball.x, tempFireball.y)) {
            this.remove(entity);
            handleExplosion(tempFireball.x, tempFireball.y);
          } else {
            entity.y -= 1;
          }
        } else if (direction === "down") {
          tempFireball.y += 1;
          let newLocationEntity = this.getEntityAtLocation(
            tempFireball.x,
            tempFireball.y
          );
          if (newLocationEntity && !(newLocationEntity instanceof Blood)) {
            this.remove(entity);
            handleExplosion(newLocationEntity.x, newLocationEntity.y);
            return;
          }
          if (this.isWall(tempFireball.x, tempFireball.y)) {
            this.remove(entity);
            handleExplosion(tempFireball.x, tempFireball.y);
          } else {
            entity.y += 1;
          }
        } else if (direction === "left") {
          tempFireball.x -= 1;
          let newLocationEntity = this.getEntityAtLocation(
            tempFireball.x,
            tempFireball.y
          );
          if (newLocationEntity && !(newLocationEntity instanceof Blood)) {
            this.remove(entity);
            handleExplosion(newLocationEntity.x, newLocationEntity.y);
            return;
          }
          if (this.isWall(tempFireball.x, tempFireball.y)) {
            this.remove(entity);
            handleExplosion(tempFireball.x, tempFireball.y);
          } else {
            entity.x -= 1;
          }
        } else if (direction === "right") {
          tempFireball.x += 1;
          let newLocationEntity = this.getEntityAtLocation(
            tempFireball.x,
            tempFireball.y
          );
          if (newLocationEntity && !(newLocationEntity instanceof Blood)) {
            this.remove(entity);
            handleExplosion(newLocationEntity.x, newLocationEntity.y);
            return;
          }
          if (this.isWall(tempFireball.x, tempFireball.y)) {
            this.remove(entity);
            handleExplosion(tempFireball.x, tempFireball.y);
          } else {
            entity.x += 1;
          }
        }
      }
    });
  }

  removeHit() {
    this.didHit = false;
  }

  movePlayer(dx, dy) {
    this.removeHit();
    let tempPlayer = this.player.copyPlayer();
    if (tempPlayer.inspecting[0]?.pos === null) {
      tempPlayer.inspecting.splice(0, 1)
    }
    tempPlayer.move(dx, dy);
    let entity = this.getEntityAtLocation(tempPlayer.x, tempPlayer.y);
    if (entity && !(entity instanceof Blood)) {
      entity.action("bump", this);
      if (entity instanceof Monster) {
        this.didHit = true;
        this.lastHit.x = tempPlayer.x;
        this.lastHit.y = tempPlayer.y;
      }
      return;
    }
    if (this.isWall(tempPlayer.x, tempPlayer.y)) {
    } else {
      this.player.move(dx, dy);
    }
  }

  addNew() {
    let tempPlayer = this.player.copyPlayer();
    this.remove(this.player.inspecting[0].entity)
    this.addToHistory(tempPlayer.addN());
  }

  moveMonsters() {
    const player = this.entities[0];

    let movingMonsters = new Set();

    this.fov.compute(
      player.x,
      player.y,
      player.attributes.sightRadius,
      (x, y) => {
        let entity = this.getEntityAtLocation(x, y);

        if (entity instanceof Monster) {
          movingMonsters.add(entity);
        }
      }
    );

    movingMonsters.forEach((monster) => {
      let distance = Math.sqrt(
        (monster.x - player.x) ** 2 + (monster.y - player.y) ** 2
      );
      if (distance < 6) {
        let astar = new Path.AStar(
          monster.x,
          monster.y,
          this.isPassable.bind(this)
        );
        let path = [];
        astar.compute(player.x, player.y, (x, y) => {
          path.push({ x: x, y: y });
        });
        if (
          path.length === 2 &&
          (player.x === monster.x || player.y === monster.y)
        ) {
          //in range to fight
          monster.action("monsterBump", this);
        } else {
          // move closer
          let closestNextSquare = path[path.length - 2];

          if (
            closestNextSquare.x === monster.x ||
            closestNextSquare.y === monster.y
          ) {
            //it's not a diagonal square, so we can move there as long as it's not a wall
            let entityAtLocation = this.getEntityAtLocation(
              closestNextSquare.x,
              closestNextSquare.y
            );
            if (entityAtLocation instanceof Blood) {
              entityAtLocation = undefined;
            }

            if (entityAtLocation instanceof Loot) {
              this.addToHistory(
                `${entityAtLocation.attributes.name} has been destroyed by ${monster.attributes.name}!`
              );
              this.remove(entityAtLocation);
            }

            if (
              !this.isWall(closestNextSquare.x, closestNextSquare.y) &&
              !entityAtLocation
            ) {
              monster.x = closestNextSquare.x;
              monster.y = closestNextSquare.y;
            }
          } else {
            //it's a diagonal
            let coinFlip = Math.random();
            if (coinFlip > 0.5) {
              //move x axis

              let entityAtLocation = this.getEntityAtLocation(
                closestNextSquare.x,
                monster.y
              );
              if (entityAtLocation instanceof Blood) {
                entityAtLocation = undefined;
              }

              if (
                !this.isWall(closestNextSquare.x, monster.y) &&
                !entityAtLocation
              ) {
                monster.x = closestNextSquare.x;
              }
            } else {
              //move y axis

              let entityAtLocation = this.getEntityAtLocation(
                monster.x,
                closestNextSquare.y
              );
              if (entityAtLocation instanceof Blood) {
                entityAtLocation = undefined;
              }

              if (
                !this.isWall(monster.x, closestNextSquare.y) &&
                !entityAtLocation
              ) {
                monster.y = closestNextSquare.y;
              }
            }
          }
        }
      }
    });
  }

  draw(context) {
    delete this.visibleMonsters;
    this.visibleMonsters = new Set([]);
    const player = this.entities[0];

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.drawShadow(context, x, y);
      }
    }

    this.fov.compute(
      player.x,
      player.y,
      player.attributes.sightRadius,
      (x, y) => {
        if (x >= 0 && y >= 0 && y < this.height && x < this.width) {
          if (this.worldmap[x][y] === 1) {
            this.drawWall(context, x, y);
          } else {
            this.drawGround(context, x, y);
          }
          let entity = this.getEntityAtLocation(x, y);

          if (entity) {
            if (entity instanceof Monster) {
              this.visibleMonsters.add(entity);
            }
            entity.draw(context, entity, this.atlases);
          }
        }
      }
    );

    // USE THIS TO DEBUG WHEN WORKING WITH FOG OF WAR

    // this.entities.forEach((entity) => {
    //   entity.draw(context, entity, this.atlases);
    // });
  }

  drawTopLayer(context) {
    if (this.didHit) {
      context.drawImage(
        this.atlases.fxAtlas,
        hit[getRandomInt(hit.length)].spriteSheetCoordinates.x,
        hit[getRandomInt(hit.length)].spriteSheetCoordinates.y,
        24,
        24,
        this.lastHit.x * this.tilesize,
        this.lastHit.y * this.tilesize,
        this.tilesize,
        this.tilesize
      );
    }

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let entity = this.getEntityAtLocation(x, y);

        if (entity) {
          if (entity instanceof Blastwave) {
            entity.draw(context, entity, this.atlases);
          }
        }
      }
    }
  }

  drawWall(context, x, y) {
    if (this.worldmap[x][y + 1] === 0) {
      context.drawImage(
        this.atlases.terrainAtlas,
        248,
        1392,
        48,
        48,
        x * this.tilesize,
        y * this.tilesize,
        this.tilesize,
        this.tilesize
      );
    } else {
      context.drawImage(
        this.atlases.terrainAtlas,
        248,
        1344,
        48,
        48,
        x * this.tilesize,
        y * this.tilesize,
        this.tilesize,
        this.tilesize
      );
    }
  }

  drawGround(context, x, y) {
    //stone ground
    // 480,
    // 288,
    context.drawImage(
      this.atlases.terrainAtlas,
      48,
      336,
      48,
      48,
      x * this.tilesize,
      y * this.tilesize,
      this.tilesize,
      this.tilesize
    );
  }

  drawShadow(context, x, y) {
    context.fillStyle = "#000";
    context.fillRect(
      x * this.tilesize,
      y * this.tilesize,
      this.tilesize,
      this.tilesize
    );
  }

  addToHistory(history) {
    this.history.push(history);
    if (this.history.length > 9) this.history.shift();
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default World;
