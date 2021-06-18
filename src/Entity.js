import heros from "./assets/uf_heroes_simple.png";
import terrain from "./assets/uf_terrain.png";
import items from "./assets/uf_items.png";

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

  draw(context, entity) {
    if (entity.attributes.type === "player") {
      const heroAtlas = new Image();
      heroAtlas.src = heros;
      heroAtlas.onload = () => {
        context.drawImage(
          heroAtlas,
          48,
          48,
          48,
          48,
          this.x * this.tilesize,
          this.y * this.tilesize,
          this.tilesize,
          this.tilesize
        );
      };
    } else if (entity.attributes.type === "monster") {
      const heroAtlas = new Image();
      heroAtlas.src = heros;
      heroAtlas.onload = () => {
        context.drawImage(
          heroAtlas,
          240,
          144,
          48,
          48,
          this.x * this.tilesize,
          this.y * this.tilesize,
          this.tilesize,
          this.tilesize
        );
      };
    } else if (entity.attributes.type === "loot") {
      const itemAtlas = new Image();
      itemAtlas.src = items;
      itemAtlas.onload = () => {
        context.drawImage(
          itemAtlas,
          336,
          48,
          48,
          48,
          this.x * this.tilesize,
          this.y * this.tilesize,
          this.tilesize,
          this.tilesize
        );
      };
    } else if (entity.attributes.type === "stairs") {
      const terrainAtlas = new Image();
      terrainAtlas.src = terrain;
      terrainAtlas.onload = () => {
        context.drawImage(
          terrainAtlas,
          432,
          96,
          48,
          48,
          this.x * this.tilesize,
          this.y * this.tilesize,
          this.tilesize,
          this.tilesize
        );
      };
    }
  }
}

export default Entity;
