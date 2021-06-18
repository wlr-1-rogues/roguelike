import Entity from "./Entity";

class Player extends Entity {
  inventory = [];
  inspecting = [];
  left = [];
  right = [];
  head = [];
  torso = [];

  attributes = {
    // name: "Player",
    attack: 2,
    defense: 12,
    damage: 2,
    armor: 0,
    health: 10,
    sightRadius: 7,
    spriteSheet: 'heroAtlas',
    spriteSheetCoordinates: {
      x: 48,
      y: 240
    }
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

  inspect(index) {
    if (this.inventory[index]) {
      if (this.inspecting[0]?.index === index) {
        this.inspecting.splice(0, 1);
      } else if (this.inspecting.length === 1) {
        this.inspecting.splice(0, 1);
        this.inspecting.push({index: index, item: this.inventory[index]});
      } else {
        this.inspecting.push({index: index, item: this.inventory[index]});
      }
    } else {
      return "add an item to your inventory first!"
    }
  }

  inspectE(item) {
    if (item === 'left') {
      if (this.inspecting[0]?.index === 'left') {
        this.inspecting.splice(0, 1);
      } else if (this.inspecting.length === 1) {
        this.inspecting.splice(0, 1);
        this.inspecting.push({index: item, item: this.left[0][0]});
      } else {
        this.inspecting.push({index: item, item: this.left[0][0]});
      }
    } else if (item === 'right') {
      if (this.inspecting[0]?.index === 'right') {
        this.inspecting.splice(0, 1);
      } else if (this.inspecting.length === 1) {
        this.inspecting.splice(0, 1);
        this.inspecting.push({index: item, item: this.right[0][0]});
      } else {
        this.inspecting.push({index: item, item: this.right[0][0]});
      }
    } else if (item === 'head') {
      if (this.inspecting[0]?.index === 'head') {
        this.inspecting.splice(0, 1);
      } else if (this.inspecting.length === 1) {
        this.inspecting.splice(0, 1);
        this.inspecting.push({index: item, item: this.head[0][0]});
      } else {
        this.inspecting.push({index: item, item: this.head[0][0]});
      }
    } else if (item === 'torso') {
      if (this.inspecting[0]?.index === 'torso') {
        this.inspecting.splice(0, 1);
      } else if (this.inspecting.length === 1) {
        this.inspecting.splice(0, 1);
        this.inspecting.push({index: item, item: this.torso[0][0]});
      } else {
        this.inspecting.push({index: item, item: this.torso[0][0]});
      }
    } else {
      return "equip an item to inspect this slot!"
    }
  }

  unequip(index) {
    if (typeof this.inspecting[0]?.index === 'string') {
      const { attributes } = this.inspecting[index].item;
      const health = `you use the ${attributes.name} and gain ${attributes.mod1} health points`
      const equip = `you equip the ${attributes.name}`
        // WEAPONS
      if (attributes.class === "weapon" && this.left.length === 0) {
        this.attributes.attack += attributes.mod1;
        this.attributes.damage += attributes.mod2;
        if(attributes.mod3) this.attributes.sightRadius += attributes.mod3;
        this.left.push(this.inventory.splice(this.inspecting[index].index, 1));
        this.inspecting.splice(0, 1);
        return equip
      } else if (attributes.class === "weapon" && this.left.length === 1) {
        this.attributes.attack += attributes.mod1;
        this.attributes.damage += attributes.mod2;
        if(attributes.mod3) this.attributes.sightRadius += attributes.mod3;
        this.right.push(this.inventory.splice(this.inspecting[index].index, 1));
        this.inspecting.splice(0, 1);
        return equip
        // SHIELDS
      } else if (attributes.class === "shield" && this.left.length === 0) {
        this.attributes.defense += attributes.mod1;
        this.attributes.armor += attributes.mod2;
        this.left.push(this.inventory.splice(this.inspecting[index].index, 1));
        this.inspecting.splice(0, 1);
        return equip
      } else if (attributes.class === "shield" && this.left.length === 1) {
        this.attributes.defense += attributes.mod1;
        this.attributes.armor += attributes.mod2;
        this.right.push(this.inventory.splice(this.inspecting[index].index, 1));
        this.inspecting.splice(0, 1);
        return equip
        // HEAD
      } else if (attributes.class === "head" && this.head.length === 0) {
        this.attributes.defense += attributes.mod1;
        this.attributes.armor += attributes.mod2;
        this.head.push(this.inventory.splice(this.inspecting[index].index, 1));
        this.inspecting.splice(0, 1);
        return equip
        // TORSO
      } else if (attributes.class === "torso" && this.torso.length === 0) {
        this.attributes.defense += attributes.mod1;
        this.attributes.armor += attributes.mod2;
        this.torso.push(this.inventory.splice(this.inspecting[index].index, 1));
        this.inspecting.splice(0, 1);
        return equip
        // CONSUMABLES
      } else if (attributes.class === "healthCon") {
        this.attributes.health += attributes.mod1;
        this.inventory.splice(this.inspecting[index].index, 1);
        this.inspecting.splice(0, 1);
        return health
      } else if (attributes.class === "shieldCon") {
        this.attributes.armor += attributes.mod1;
        this.inventory.splice(this.inspecting[index].index, 1);
        this.inspecting.splice(0, 1);
        return health
      } else {
        return "you cannot equip this item!";
      }
    } else {
      return "inspect an item in your inventory to equip!";
    }
  }

  equip(index) {
    if (this.inspecting.length === 1) {
      const { attributes } = this.inspecting[index].item;
      const health = `you use the ${attributes.name} and gain ${attributes.mod1} health points`
      const equip = `you equip the ${attributes.name}`
        // WEAPONS
      if (attributes.class === "weapon" && this.left.length === 0) {
        this.attributes.attack += attributes.mod1;
        this.attributes.damage += attributes.mod2;
        if(attributes.mod3) this.attributes.sightRadius += attributes.mod3;
        this.left.push(this.inventory.splice(this.inspecting[index].index, 1));
        this.inspecting.splice(0, 1);
        return equip
      } else if (attributes.class === "weapon" && this.left.length === 1) {
        this.attributes.attack += attributes.mod1;
        this.attributes.damage += attributes.mod2;
        if(attributes.mod3) this.attributes.sightRadius += attributes.mod3;
        this.right.push(this.inventory.splice(this.inspecting[index].index, 1));
        this.inspecting.splice(0, 1);
        return equip
        // SHIELDS
      } else if (attributes.class === "shield" && this.left.length === 0) {
        this.attributes.defense += attributes.mod1;
        this.attributes.armor += attributes.mod2;
        this.left.push(this.inventory.splice(this.inspecting[index].index, 1));
        this.inspecting.splice(0, 1);
        return equip
      } else if (attributes.class === "shield" && this.left.length === 1) {
        this.attributes.defense += attributes.mod1;
        this.attributes.armor += attributes.mod2;
        this.right.push(this.inventory.splice(this.inspecting[index].index, 1));
        this.inspecting.splice(0, 1);
        return equip
        // HEAD
      } else if (attributes.class === "head" && this.head.length === 0) {
        this.attributes.defense += attributes.mod1;
        this.attributes.armor += attributes.mod2;
        this.head.push(this.inventory.splice(this.inspecting[index].index, 1));
        this.inspecting.splice(0, 1);
        return equip
        // TORSO
      } else if (attributes.class === "torso" && this.torso.length === 0) {
        this.attributes.defense += attributes.mod1;
        this.attributes.armor += attributes.mod2;
        this.torso.push(this.inventory.splice(this.inspecting[index].index, 1));
        this.inspecting.splice(0, 1);
        return equip
        // CONSUMABLES
      } else if (attributes.class === "healthCon") {
        this.attributes.health += attributes.mod1;
        this.inventory.splice(this.inspecting[index].index, 1);
        this.inspecting.splice(0, 1);
        return health
      } else if (attributes.class === "shieldCon") {
        this.attributes.armor += attributes.mod1;
        this.inventory.splice(this.inspecting[index].index, 1);
        this.inspecting.splice(0, 1);
        return health
      } else {
        return "you cannot equip this item!";
      }
    } else {
      return "inspect an item in your inventory to equip!";
    }
  }

  drop(item) {
    const drop = `the ${this.inspecting[0].item.attributes.name} crumbles into dust...`
    this.inspecting.splice(item, 1)
    this.inventory.splice(this.inspecting[0].index, 1);
    return drop
  }

  copyPlayer() {
    let newPlayer = new Player();
    Object.assign(newPlayer, this);
    return newPlayer;
  }
}

export default Player;
