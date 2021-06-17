import { Map, FOV, Path } from "rot-js";
import Entity from "./Entity";
import Monster from "./Monster";
import Player from "./Player";

class World {
  constructor(width, height, tilesize) {
    this.width = width;
    this.height = height;
    this.tilesize = tilesize;
    this.entities = [new Player(0, 0, 16)];
    this.history = ["You enter the dungeon", "---"];

    this.worldmap = new Array(this.width);
    for (let x = 0; x < this.width; x++) {
      this.worldmap[x] = new Array(this.height);
    }

    this.fov = new FOV.RecursiveShadowcasting(this.lightPasses.bind(this));
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

  // let distance = Math.sqrt(
  //   (entity.x - player.x) ** 2 + (entity.y - player.y) ** 2
  // );
  // if (distance < 6) {
  //   console.log("you're going to jail now!");
  //   let astar = new Path.AStar(
  //     entity.x,
  //     entity.y,
  //     this.isPassable.bind(this)
  //   );
  //   let path = [];
  //   astar.compute(player.x, player.y, (x, y) => {
  //     path.push({ x: x, y: y });
  //   });
  //   let desiredX = path[path.length - 2]?.x;
  //   let desiredY = path[path.length - 2]?.y;
  //   let xDiff = Math.sqrt((entity.x - player.x) ** 2);
  //   let yDiff = Math.sqrt((entity.y - player.y) ** 2);
  //   if (xDiff > yDiff) {
  //     if (!this.isWall(desiredX, entity.y)) {
  //       console.log("move x 1");
  //       if (player.x === desiredX && player.y === entity.y) {
  //         entity.action("bump", this);
  //       } else {
  //         entity.x = desiredX;
  //       }
  //     } else if (!this.isWall(entity.x, desiredY)) {
  //       console.log("move y 1");
  //       if (player.x === entity.y && player.y === desiredY) {
  //         entity.action("bump", this);
  //       } else {
  //         entity.y = desiredY;
  //       }
  //     }
  //   } else {
  //     if (!this.isWall(entity.x, desiredY)) {
  //       console.log("move y 2");
  //       if (player.x === entity.y && player.y === desiredY) {
  //         entity.action("bump", this);
  //       } else {
  //         entity.y = desiredY;
  //       }
  //     } else if (!this.isWall(desiredX, entity.y)) {
  //       console.log("move x 2");
  //       if (player.x === desiredX && player.y === entity.y) {
  //         entity.action("bump", this);
  //       } else {
  //         entity.x = desiredX;
  //       }
  //     }
  //   }
  // }

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
        console.log("you're going to jail now!");
        let astar = new Path.AStar(
          monster.x,
          monster.y,
          this.isPassable.bind(this)
        );
        let path = [];
        astar.compute(player.x, player.y, (x, y) => {
          path.push({ x: x, y: y });
        });
        console.log(path);
        if (
          path.length === 2 &&
          (player.x === monster.x || player.y === monster.y)
        ) {
          //in range to fight
          console.log("monster attacks");
          monster.action("monsterBump", this);
        } else {
          // move closer
          let closestNextSquare = path[path.length - 2];

          if (
            closestNextSquare.x === monster.x ||
            closestNextSquare.y === monster.y
          ) {
            //it's not a diagonal square, so we can move there as long as it's not a wall
            if (!this.isWall(closestNextSquare.x, closestNextSquare.y)) {
              monster.x = closestNextSquare.x;
              monster.y = closestNextSquare.y;
            }
          } else {
            //it's a diagonal
            let coinFlip = Math.random();
            if (coinFlip > 0.5) {
              //move x axis
              if (!this.isWall(closestNextSquare.x, monster.y)) {
                monster.x = closestNextSquare.x;
              }
            } else {
              //move y axis
              if (!this.isWall(monster.x, closestNextSquare.y)) {
                monster.y = closestNextSquare.y;
              }
            }
          }
        }
      }
    });
  }

  draw(context) {
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
          entity.draw(context);
        }
      }
    );
  }

  drawWall(context, x, y) {
    context.fillStyle = "#937c5d";
    context.fillRect(
      x * this.tilesize,
      y * this.tilesize,
      this.tilesize,
      this.tilesize
    );
  }

  drawGround(context, x, y) {
    context.fillStyle = "#e6d9b1";
    context.fillRect(
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
