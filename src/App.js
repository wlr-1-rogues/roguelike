import ReactRogue from "./ReactRogue";
import LandingPage from './LandingPage';
import Sound from 'react-sound'
import Cave from './assets/sounds/Cave Ambience.mp3'

import React, { useEffect, useState } from "react";
import heros from "./assets/uf_heroes_simple.png";
import terrain from "./assets/uf_terrain.png";
import items from "./assets/uf_items.png";
import fx from "./assets/uf_FX.png";


const App = () => {
  const [atlases, setAtlases] = useState(null);
  const [newGame, setNewGame] = useState(false)

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

  const startGame = () => {
    setNewGame(!newGame)
  }

  return (
    <div className="App">
        <Sound 
          url={Cave}
          playStatus={Sound.status.PLAYING}
          playFromPosition={300}
          volume='50'
          loop='true'
        />
      {!atlases ? (
        <div>Loading</div>
      ) : (
        <div>
        {!newGame && <div className='welcome'>
          <LandingPage 
            startGame = {startGame}
          />
        </div>}
        {newGame && <div className='gameMap'>
          <ReactRogue width={40} height={40} tilesize={24} atlases={atlases} />
        </div>}
        </div>
      )}
    </div>
  );
};

export default App;
