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
    if (entity.attributes.spriteSheet === "heroAtlas") {
      context.drawImage(
        atlases.heroAtlas,
        entity.attributes.spriteSheetCoordinates.y,
        entity.attributes.spriteSheetCoordinates.x,
        48,
        48,
        this.x * this.tilesize,
        this.y * this.tilesize,
        this.tilesize,
        this.tilesize
      );
    } else if (entity.attributes.spriteSheet === "itemAtlas") {
      context.drawImage(
        atlases.itemAtlas,
        entity.attributes.spriteSheetCoordinates.y,
        entity.attributes.spriteSheetCoordinates.x,
        48,
        48,
        this.x * this.tilesize,
        this.y * this.tilesize,
        this.tilesize,
        this.tilesize
      );
    } else if (entity.attributes.type === "stairs") {
      context.drawImage(
        atlases.terrainAtlas,
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
