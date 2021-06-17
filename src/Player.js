import Entity from "./Entity";

class Player extends Entity {
  inventory = [];

  attributes = {
    name: "Player",
    ascii: "🤺",
    attack: 2,
    defense: 12,
    damage: 2,
    armor: 0,
    health: 10,
  };

  move(dx, dy) {
    if (this.attributes.health <= 0) return;
    this.x += dx;
    this.y += dy;
  }

  add(item) {
    this.inventory.push(item);
  }

  copyPlayer() {
    let newPlayer = new Player();
    Object.assign(newPlayer, this);
    return newPlayer;
  }
}

export default Player;
