import Entity from "./Entity";

class Player extends Entity {
  inventory = [];
  inspecting = [];
  hands = [];
  head = [];
  torso = [];

  attributes = {
    name: "Player",
    ascii: "🤺",
    attack: 2,
    defense: 12,
    damage: 2,
    armor: 0,
    health: 10,
    sightRadius: 10,
    type: "player",
  };

  move(dx, dy) {
    if (this.attributes.health <= 0) return;
    this.x += dx;
    this.y += dy;
  }

  add(item) {
    if(this.inventory.length === 5) {
      return "inventory full!"
    } else {
      this.inventory.push(item);
      return `picked up ${item.attributes.name}`
    }
  }

  inspect(item) {
    if (this.inventory[item]) {
      if (this.inspecting[0] === item) {
        this.inspecting.splice(0, 1);
      } else if (this.inspecting.length === 1) {
        this.inspecting.splice(0, 1);
        this.inspecting.push([item, this.inventory[item]]);
      } else {
        this.inspecting.push([item, this.inventory[item]]);
      }
    } else {
      return "add an item to your inventory first!"
    }
    console.log(this.inspecting)
  }

  equip(item) {
    console.log(this.inventory[this.inspecting[item]]);
    if (this.inspecting.length === 1) {
      const { attributes } = this.inventory[this.inspecting[item]];
        // 1h weapons
      if (attributes.class === "1h" && this.hands.length < 2) {
        this.attributes.attack += attributes.mod1;
        this.attributes.damage += attributes.mod2;
        this.hands.push(this.inventory.splice(this.inspecting[item], 1));
        this.inspecting.splice(0, 1);
        // shields
      } else if (attributes.class === "shield" && this.hands.length < 2) {
        this.attributes.defense += attributes.mod1;
        this.attributes.armor += attributes.mod2;
        this.hands.push(this.inventory.splice(this.inspecting[item], 1));
        this.inspecting.splice(0, 1);
        // consumables
      } else if (attributes.class === "health") {
        this.attributes.health += attributes.mod1;
        console.log(
          `you use the ${attributes.name} and gain ${attributes.mod1} health points`
        );
        this.inventory.splice(this.inspecting[item], 1);
        this.inspecting.splice(0, 1);
      } else {
        console.log("you cannot equip this item!", attributes.class);
      }
    } else {
      console.log("inspect an item in your inventory to equip!");
    }
    console.log(this.attributes)
  }

  unequip(item) {
    if (this.hands[item]) {
      this.inventory.push(this.hands.splice(item, 1));
    }
  }

  drop(item) {
    console.log(`the ${this.inventory[this.inspecting[item]].attributes.name} crumbles into dust...`)
    this.inspecting.splice(item, 1)
    this.inventory.splice(this.inspecting[item], 1);
  }

  copyPlayer() {
    let newPlayer = new Player();
    Object.assign(newPlayer, this);
    return newPlayer;
  }
}

export default Player;
