import ReactRogue from "./ReactRogue";

import React, { useEffect, useState } from "react";
import heros from "./assets/uf_heroes_simple.png";
import terrain from "./assets/uf_terrain.png";
import items from "./assets/uf_items.png";
import fx from "./assets/uf_FX.png";

const App = () => {
  const [atlases, setAtlases] = useState(null);

  useEffect(() => {
    const heroAtlas = new Image();
    heroAtlas.src = heros;
    heroAtlas.onload = () => {
      const itemAtlas = new Image();
      itemAtlas.src = items;
      itemAtlas.onload = () => {
        const terrainAtlas = new Image();
        terrainAtlas.src = terrain;
        terrainAtlas.onload = () => {
          const fxAtlas = new Image();
          fxAtlas.src = fx;
          fxAtlas.onload = () => {
            setAtlases({ heroAtlas, itemAtlas, terrainAtlas, fxAtlas });
          };
        };
      };
    };
  }, []);

  return (
    <div className="App">
      {!atlases ? (
        <div>Loading</div>
      ) : (
        <>
          <ReactRogue width={40} height={40} tilesize={24} atlases={atlases} />
        </>
      )}
    </div>
  );
};

export default App;
