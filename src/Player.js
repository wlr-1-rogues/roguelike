import Entity from "./Entity";

class Player extends Entity {
  equipped = {}
  inventory = [];

  attributes = {
    name: "Player",
    ascii: "🤺",
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

  equip(item) {
    this.equipped = this.inventory[item]
    console.log(this.equipped)
  }

  copyPlayer() {
    let newPlayer = new Player();
    Object.assign(newPlayer, this);
    return newPlayer;
  }
}

export default Player;
