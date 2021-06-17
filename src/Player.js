import Entity from "./Entity";

class Player extends Entity {
  
  gold = 0;
  inventory = [];
  inspecting = [];
  hands = [];

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
    if(item.attributes.class === 'gold') return this.gold += item.attributes.mod1;
    this.inventory.length + this.hands.length === 6? console.log('inventory full!')
    : this.inventory.push(item)
  }

  inspect(item) {
    console.log(item)
    if(this.inventory[item]){
      if(this.inspecting.length === 1) {
        this.inspecting.splice(0, 1)
      } else {
        this.inspecting.push(item)
      }
    } else {
      console.log('add an item to your inventory first!')
    }
    console.log(this.inspecting)
    console.log(this.inventory)
  }

  equip(item) {
    if(this.inspecting.length === 1) {
      const {attributes} = this.inventory[this.inspecting[item]]
      // 1h weapons
      if(attributes.class === "1h" && this.hands.length < 2) {
        this.attributes.attack += attributes.mod1 
        this.attributes.damage += attributes.mod2
        this.hands.push(attributes.splice(item, 1))
        console.log(this.hands)
      // 2h weapons
      } else if(attributes.class === "2h" && this.hands.length === 0) {
        this.attributes.attack += attributes.mod1 
        this.attributes.damage += attributes.mod2
        this.hands.push(attributes.splice(item, 1))
        console.log(this.hands)
      // shields
      } else if(attributes.class === "shield" && this.hands.length === 0) {
        this.attributes.defense += attributes.mod1 
        this.attributes.armor += attributes.mod2
        this.hands.push(attributes.splice(item, 1))
      // consumables
      } else if(attributes.class === "health") {
        this.attributes.health += attributes.mod1
        console.log(`you use the ${attributes.name} and gain ${attributes.modifier} health points`)
        attributes.splice(item, 1)
      } else {
        console.log('you cannot equip this item!', attributes.class)
      }
    } else {
      console.log('inspect an item in your inventory to equip!')
    }
  }

  unequip(item) {
    if(this.hands[item]) {
      this.inventory.push(this.hands.splice(item, 1))
    }
  }

  drop(item) {
    this.inventory.splice(item, 1)
  }

  copyPlayer() {
    let newPlayer = new Player();
    Object.assign(newPlayer, this);
    return newPlayer;
  }
}

export default Player;
