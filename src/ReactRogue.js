import React, { useRef, useEffect, useState } from "react";
import InputManager from "./InputManager";
import Player from "./Player";
import Spawner from "./Spawner";
import World from "./World";

const ReactRogue = ({ width, height, tilesize }) => {
  const canvasRef = React.useRef(null);
  //const [player, setPlayer] = useState(new Player(1, 2, tilesize));
  const [world, setWorld] = useState(new World(width, height, tilesize));
  let inputManager = new InputManager();
  const handleInput = (action, data) => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.movePlayer(data.x, data.y);
    newWorld.moveMonsters();
    setWorld(newWorld);
  };

  useEffect(() => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);
    let spawner = new Spawner(newWorld);
    spawner.spawnLoot(10);
    spawner.spawnMonsters(6);
    spawner.spawnStairs();
    setWorld(newWorld);
  }, []);

  useEffect(() => {
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);
    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    };
  });

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, width * tilesize, height * tilesize);
    world.draw(ctx);
  });
  return (
    <>
      <canvas
        ref={canvasRef}
        width={width * tilesize}
        height={height * tilesize}
        style={{
          border: "1px solid SaddleBrown",
        }}
      ></canvas>
      <ul>
        {world.player.inventory.map((item, index) => (
          <li key={index}>{item.attributes.name}</li>
        ))}
      </ul>

      <ul>
        {world.history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default ReactRogue;
