import Entity from "./Entity";

class Player extends Entity {
  hands = []
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

  equip(item) {
    if(this.inventory[item]) {
      const {attributes} = this.inventory[item]
      if(attributes.class === "1h" && this.hands.length < 2) {
        this.hands.push(this.inventory.splice(item, 1))
        console.log(this.hands)
      } else if(attributes.class === "2h" && this.hands.length === 0) {
        this.hands.push(this.inventory.splice(item, 1))
        console.log(this.hands)
      } else if(attributes.class === "consumable") {
        this.attributes.health += attributes.modifier
        console.log(`you use the ${attributes.name} and gain ${attributes.modifier} health points`)
        this.inventory.splice(item, 1)
      } else {
        console.log('you cannot equip this item!', attributes.class)
      }
    } else {
      console.log('no item to equip!')
    }
  }

  copyPlayer() {
    let newPlayer = new Player();
    Object.assign(newPlayer, this);
    return newPlayer;
  }
}

export default Player;
