import React, { useRef, useEffect, useState } from "react";
import InputManager from "./InputManager";
import Player from "./Player";
import Spawner from "./Spawner";
import World from "./World";

const ReactRogue = ({ width, height, tilesize, atlases }) => {
  const canvasRef = React.useRef(null);
  const [world, setWorld] = useState(
    new World(width, height, tilesize, atlases)
  );

  let inputManager = new InputManager();
  const handleInput = (action, data) => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    if (action === "move") {
      newWorld.movePlayer(data.x, data.y);
    } else if (action === "inspect") {
      newWorld.inspectItem(data);
    } else if (action === "equip") {
      newWorld.equipItem(data);
    } else if (action === "inspectE") {
      newWorld.inspectEquip(data);
    } else if (action === "unequip") {
      newWorld.unequipItem(data);
    } else if (action === "drop") {
      newWorld.dropItem(data);
    }

    newWorld.moveMonsters();
    setWorld(newWorld);
  };

  useEffect(() => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);
    let spawner = new Spawner(newWorld);
    spawner.spawnLoot(30);
    spawner.spawnMonsters(0);
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
    <div style={{display:'flex'}}>
      <canvas
        ref={canvasRef}
        width={width * tilesize}
        height={height * tilesize}
        style={{
          border: "1px solid SaddleBrown",
        }}
      ></canvas>
      <div>equipped</div>
      <ul>
        {world.player.left.map((item, index) => (
          <li key={index}>{item[0].attributes.name}</li>
        ))}
      </ul>
      <ul>
        {world.player.right.map((item, index) => (
          <li key={index}>{item[0].attributes.name}</li>
        ))}
      </ul>
      <ul>
        {world.player.head.map((item, index) => (
          <li key={index}>{item[0].attributes.name}</li>
        ))}
      </ul>
      <ul>
        {world.player.torso.map((item, index) => (
          <li key={index}>{item[0].attributes.name}</li>
        ))}
      </ul>
      <div>inspect</div>
      {world.player.inspecting.length === 1 && (
        <>
          <ul>
            <li>
              {
                world.player.inspecting[0].item.attributes.name
              }
            </li>
          </ul>
        </>
      )}
      <div>inventory</div>
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
    </div>
  );
};

export default ReactRogue;
