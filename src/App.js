import ReactRogue from "./ReactRogue";
import React, { useEffect, useState } from "react";
import heros from "./assets/uf_heroes_simple.png";
import terrain from "./assets/uf_terrain.png";
import items from "./assets/uf_items.png";

const App = () => {
  const [atlases, setAtlases] = useState({});
  const [loading, setLoading] = useState(false);

  const heroAtlasImage = new Image();
  heroAtlasImage.src = heros;
  heroAtlasImage.onload = () => {
    console.log("heroAtlasImage loaded");
    //do something
  };

  const itemAtlasImage = new Image();
  itemAtlasImage.src = items;
  itemAtlasImage.onload = () => {
    console.log("itemAtlasImage loaded");
    //do something
  };

  const terrainAtlasImage = new Image();
  terrainAtlasImage.src = terrain;
  terrainAtlasImage.onload = () => {
    console.log("terrainAtlasImage loaded");
    //do something
  };

  return (
    <div className="App">
      {loading ? (
        <div>Loading</div>
      ) : (
        <ReactRogue width={40} height={40} tilesize={24} atlases={atlases} />
      )}
    </div>
  );
};

export default App;
