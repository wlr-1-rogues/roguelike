class Entity {
  constructor(x, y, size, attributes) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.attributes = { ...attributes };
    this.tilesize = 24;
  }

  action(verb, world) {
    console.log(`Verb: ${verb}`);
  }

  draw(context, entity, atlases) {
    if (entity.attributes.type === "player") {
      context.drawImage(
        atlases.heroAtlas,
        48,
        48,
        48,
        48,
        this.x * this.tilesize,
        this.y * this.tilesize,
        this.tilesize,
        this.tilesize
      );
    } else if (entity.attributes.type === "monster") {
      context.drawImage(
        atlases.heroAtlas,
        240,
        144,
        48,
        48,
        this.x * this.tilesize,
        this.y * this.tilesize,
        this.tilesize,
        this.tilesize
      );
    } else if (entity.attributes.type === "loot") {
      context.drawImage(
        atlases.itemAtlas,
        336,
        48,
        48,
        48,
        this.x * this.tilesize,
        this.y * this.tilesize,
        this.tilesize,
        this.tilesize
      );
    } else if (entity.attributes.type === "stairs") {
      context.drawImage(
        atlases.terrain,
        432,
        96,
        48,
        48,
        this.x * this.tilesize,
        this.y * this.tilesize,
        this.tilesize,
        this.tilesize
      );
    }
  }
}

export default Entity;
