import { Map, FOV, Path } from "rot-js";
import Entity from "./Entity";
import Monster from "./Monster";
import Player from "./Player";

class World {
  constructor(width, height, tilesize, atlases) {
    this.width = width;
    this.height = height;
    this.tilesize = tilesize;
    this.entities = [new Player(0, 0, 24)];
    this.history = ["You enter the dungeon", "---"];
    this.visibleMonsters = new Set([]);
    this.worldmap = new Array(this.width);
    for (let x = 0; x < this.width; x++) {
      this.worldmap[x] = new Array(this.height);
    }

    this.fov = new FOV.RecursiveShadowcasting(this.lightPasses.bind(this));

    this.atlases = atlases;
  }

  lightPasses(x, y) {
    if (this.worldmap[x][y] === 0) {
      return true;
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

  add(entity) {
    this.entities.push(entity);
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
    tempPlayer.inspect(itemIndex) && this.addToHistory(tempPlayer.inspect(itemIndex))
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

  dropItem() {
    let tempPlayer = this.player.copyPlayer();
    this.addToHistory(tempPlayer.drop());
  }

  movePlayer(dx, dy) {
    let tempPlayer = this.player.copyPlayer();
    tempPlayer.move(dx, dy);
    let entity = this.getEntityAtLocation(tempPlayer.x, tempPlayer.y);
    if (entity) {
      entity.action("bump", this);
      return;
    }
    if (this.isWall(tempPlayer.x, tempPlayer.y)) {
    } else {
      this.player.move(dx, dy);
    }
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
            if (
              !this.isWall(closestNextSquare.x, closestNextSquare.y) &&
              !this.getEntityAtLocation(
                closestNextSquare.x,
                closestNextSquare.y
              )
            ) {
              monster.x = closestNextSquare.x;
              monster.y = closestNextSquare.y;
            }
          } else {
            //it's a diagonal
            let coinFlip = Math.random();
            if (coinFlip > 0.5) {
              //move x axis
              if (
                !this.isWall(closestNextSquare.x, monster.y) &&
                !this.getEntityAtLocation(closestNextSquare.x, monster.y)
              ) {
                monster.x = closestNextSquare.x;
              }
            } else {
              //move y axis
              if (
                !this.isWall(monster.x, closestNextSquare.y) &&
                !this.getEntityAtLocation(monster.x, closestNextSquare.y)
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
      );

      // USE THIS TO DEBUG WHEN WORKING WITH FOG OF WAR
      
      // this.entities.forEach(entity => {
      //   entity.draw(context, entity, this.atlases);
      // })
  }

  drawWall(context, x, y) {
    context.drawImage(
      this.atlases.terrainAtlas,
      240,
      768,
      48,
      48,
      x * this.tilesize,
      y * this.tilesize,
      this.tilesize,
      this.tilesize
    );
  }

  drawGround(context, x, y) {
    context.drawImage(
      this.atlases.terrainAtlas,
      288,
      384,
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
    if (this.history.length > 6) this.history.shift();
  }
}

export default World;
