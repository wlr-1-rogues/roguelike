import Entity from "./Entity";

class Player extends Entity {
  inventory = [];
  inspecting = [];
  equipped = [];
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
      this.inventory.unshift(item.attributes);
        // working inspect before adding to inventory
        // 0 (48) in InputManager will handle adding new item to inventory
      // this.inspecting.push({item: item.attributes});
      return `picked up ${item.attributes.name}`
    }
  }

  inspect(index) {
    const [inspecting] = this.inspecting
    if (this.inventory[index]) {
      if (inspecting?.pos === index) {
        this.inspecting.splice(0, 1);
        // working inspect before adding to inventory
      // } else if (!inspecting?.pos) {
      //   this.inventory.unshift(inspecting);
      } else if (this.inspecting.length === 1) {
        this.inspecting.splice(0, 1);
        this.inspecting.push({pos: index, item: this.inventory[index]});
      } else {
        this.inspecting.push({pos: index, item: this.inventory[index]});
      }
    } else {
      return "add an item to your inventory first!"
    }
  }

  inspectE(position) {
    const [inspecting] = this.inspecting
    if (position === 'left' && this.left.length === 1) {
      if (inspecting?.pos === 'left') {
        this.inspecting.splice(0, 1);
      } else if (this.inspecting.length === 1) {
        this.inspecting.splice(0, 1);
        this.inspecting.push({pos: position, item: this.left[0]});
      } else {
        this.inspecting.push({pos: position, item: this.left[0]});
      }
    } else if (position === 'right' && this.right.length === 1) {
      if (!this.right) return;
      if (inspecting?.pos === 'right') {
        this.inspecting.splice(0, 1);
      } else if (this.inspecting.length === 1) {
        this.inspecting.splice(0, 1);
        this.inspecting.push({pos: position, item: this.right[0]});
      } else {
        this.inspecting.push({pos: position, item: this.right[0]});
      }
    } else if (position === 'head' && this.head.length === 1) {
      if (!this.head) return;
      if (inspecting?.pos === 'head') {
        this.inspecting.splice(0, 1);
      } else if (this.inspecting.length === 1) {
        this.inspecting.splice(0, 1);
        this.inspecting.push({pos: position, item: this.head[0]});
      } else {
        this.inspecting.push({pos: position, item: this.head[0]});
      }
    } else if (position === 'torso' && this.torso.length === 1) {
      if (!this.torso) return;
      if (inspecting?.pos === 'torso') {
        this.inspecting.splice(0, 1);
      } else if (this.inspecting.length === 1) {
        this.inspecting.splice(0, 1);
        this.inspecting.push({pos: position, item: this.torso[0]});
      } else {
        this.inspecting.push({pos: position, item: this.torso[0]});
      }
    } else {
      return "equip an item to inspect this slot!"
    }
  }

  equip() {
    const [inspecting] = this.inspecting
    const { item } = inspecting;
    const shield = `you use the ${item.name} and gain ${item.mod1} armor`
    const health = `you use the ${item.name} and gain ${item.mod1} health points`
    const equip = `you equip the ${item.name}`
    if (this.inspecting.length === 1) {
      if (typeof inspecting?.pos === 'string') return 'you already have this equipped!'
        // WEAPONS
      if (item.class === "weapon" && this.left.length === 0) {
        this.attributes.attack += item.mod1;
        this.attributes.damage += item.mod2;
        if(item.mod3) this.attributes.sightRadius += item.mod3;
        this.left.push(this.inventory[inspecting.pos]);
        this.inventory.splice(inspecting.pos, 1)
        this.inspecting.splice(0, 1);
        return equip
      } else if (item.class === "weapon" && this.right.length === 0) {
        this.attributes.attack += item.mod1;
        this.attributes.damage += item.mod2;
        if(item.mod3) this.attributes.sightRadius += item.mod3;
        this.right.push(this.inventory[inspecting.pos]);
        this.inventory.splice(inspecting.pos, 1)
        this.inspecting.splice(0, 1);
        return equip
        // SHIELDS
      } else if (item.class === "shield" && this.left.length === 0) {
        this.attributes.defense += item.mod1;
        this.attributes.armor += item.mod2;
        this.left.push(this.inventory[inspecting.pos]);
        this.inventory.splice(inspecting.pos, 1)
        this.inspecting.splice(0, 1);
        return equip
      } else if (item.class === "shield" && this.right.length === 0) {
        this.attributes.defense += item.mod1;
        this.attributes.armor += item.mod2;
        this.right.push(this.inventory[inspecting.pos]);
        this.inventory.splice(inspecting.pos, 1)
        this.inspecting.splice(0, 1);
        return equip
        // HEAD
      } else if (item.class === "head" && this.head.length === 0) {
        this.attributes.defense += item.mod1;
        this.attributes.armor += item.mod2;
        this.head.push(this.inventory[inspecting.pos]);
        this.inventory.splice(inspecting.pos, 1)
        this.inspecting.splice(0, 1);
        return equip
        // TORSO
      } else if (item.class === "torso" && this.torso.length === 0) {
        this.attributes.defense += item.mod1;
        this.attributes.armor += item.mod2;
        this.torso.push(this.inventory[inspecting.pos]);
        this.inventory.splice(inspecting.pos, 1)
        this.inspecting.splice(0, 1);
        return equip
        // CONSUMABLES
      } else if (item.class === "healthCon") {
        this.attributes.health += item.mod1;
        this.attributes.health += item.mod1 > 10 ? this.attributes.health = 10
        : this.attributes.health += item.mod1
        this.inventory.splice(inspecting.pos, 1);
        this.inspecting.splice(0, 1);
        return health
      } else if (item.class === "shieldCon") {
        this.attributes.armor += item.mod1;
        this.inventory.splice(inspecting.pos, 1);
        this.inspecting.splice(0, 1);
        return shield
      } else {
        this.inspecting.splice(0, 1);
        return "you cannot equip this item!";
      }
    } else {
      return "inspect an item in your inventory to equip!";
    }
  }

  unequip() {
    const [inspecting] = this.inspecting
    const { item } = inspecting;
    const unequip = `you unequip the ${item.name}`
    if (typeof inspecting?.pos === 'string') {
        // WEAPONS
      if (inspecting.pos === "left" && this.inventory.length < 5) {
        this.attributes.attack -= item.mod1;
        this.attributes.damage -= item.mod2;
        if(item.mod3) this.attributes.sightRadius -= item.mod3;
        this.inventory.unshift(this.left[0]);
        this.left.splice(0, 1)
        this.inspecting.splice(0, 1);
        return unequip
      } else if (inspecting.pos === "right" && this.inventory.length < 5) {
        this.attributes.attack -= item.mod1;
        this.attributes.damage -= item.mod2;
        if(item.mod3) this.attributes.sightRadius -= item.mod3;
        this.inventory.unshift(this.right[0]);
        this.right.splice(0, 1)
        this.inspecting.splice(0, 1);
        return unequip
        // SHIELDS
      } else if (inspecting.pos === "left" && item.class === 'sheild' && this.inventory.length < 5) {
        this.attributes.defense -= item.mod1;
        this.attributes.armor -= item.mod2;
        this.inventory.unshift(this.left[0]);
        this.left.splice(0, 1)
        this.inspecting.splice(0, 1);
        return unequip
      } else if (inspecting.pos === "right" && item.class === 'sheild' && this.inventory.length < 5) {
        this.attributes.defense -= item.mod1;
        this.attributes.armor -= item.mod2;
        this.inventory.unshift(this.right[0]);
        this.right.splice(0, 1)
        this.inspecting.splice(0, 1);
        return unequip
        // HEAD
      } else if (inspecting.pos === "head" && this.inventory.length < 5) {
        this.attributes.defense -= item.mod1;
        this.attributes.armor -= item.mod2;
        this.inventory.unshift(this.head[0]);
        this.head.splice(0, 1)
        this.inspecting.splice(0, 1);
        return unequip
        // TORSO
      } else if (inspecting.pos === "torso" && this.inventory.length < 5) {
        this.attributes.defense -= item.mod1;
        this.attributes.armor -= item.mod2;
        this.inventory.unshift(this.torso[0]);
        this.torso.splice(0, 1)
        this.inspecting.splice(0, 1);
        return unequip
      } else {
        return "drop an item before unequipping";
      }
    } else {
      return "inspect an equipped item to unequip!";
    }
  }

  cast() {
    const [inspecting] = this.inspecting
    this.inventory.splice(inspecting.pos, 1);
    this.inspecting.splice(0, 1);
    return 'the tome vanishes in a poof of smoke'
  }

  drop() {
    const [inspecting] = this.inspecting
    if (!inspecting) return 'inspect and item first!';
    if (typeof inspecting?.pos === 'string') {
      const drop = `the ${inspecting.item.name} crumbles into dust...`
      this[inspecting?.pos].splice(inspecting.pos, 1);
      this.inspecting.splice(0, 1)
      return drop
    }
    const drop = `the ${inspecting.item.name} crumbles into dust...`
    this.inventory.splice(inspecting.pos, 1);
    this.inspecting.splice(0, 1)
    return drop
  }

  copyPlayer() {
    let newPlayer = new Player();
    Object.assign(newPlayer, this);
    return newPlayer;
  }
}

export default Player;
