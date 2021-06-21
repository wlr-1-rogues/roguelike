import React, { useRef, useEffect, useState } from "react";
import MonsterDisplay from "./MonsterDisplay";
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
    spawner.spawnLoot(10);
    spawner.spawnMonsters(10);
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
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          height: "1.5vh",
          width: "98vw",
          borderStyle: "solid",
          borderColor: "white",
          alignItems: "center",
        }}
      ></header>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div
          className="leftOfCanvas"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "20vw",
            minHeight: "100vh",
            borderStyle: "solid",
            borderColor: "black",
          }}
        >
          <div
            className="newPlayer"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "15%",
              width: "95%",
              justifyContent: "center",
              alignItems: "center",
              borderStyle: "solid",
              borderColor: "black",
              marginTop: "1vw",
            }}
          >
            <h3>Player Stats</h3>
            <section
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "2vh",
                width: "27.5%",
                paddingLeft: "1vw",
                paddingRight: "1vw",
                borderStyle: "solid",
                borderColor: "black",
                marginTop: "-1vh",
                marginBottom: "1vh",
              }}
            >
              Health Bar
            </section>
            <div
              style={{
                display: "flex",
                width: "35%",
                justifyContent: "space-between",
              }}
            >
              <div>
                Attack:
                <br></br>
                Defense:
                <br></br>
                Damage:
                <br></br>
                Armor:
                <br></br>
                Health:
                <br></br>
                Visibility:
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "right",
                }}
              >
                {world.player.attributes.attack}
                <br></br>
                {world.player.attributes.defense}
                <br></br>
                {world.player.attributes.damage}
                <br></br>
                {world.player.attributes.armor}
                <br></br>
                {world.player.attributes.health}
                <br></br>
                {world.player.attributes.sightRadius}
                <br></br>
                <br></br>
              </div>
            </div>
          </div>

          <div
            className="equippedItems"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "15%",
              width: "95%",
              justifyContent: "center",
              alignItems: "center",
              borderStyle: "solid",
              borderColor: "black",
              marginTop: "1vw",
              marginBottom: "1vw",
            }}
          >
            <h3>Equipped Items</h3>
            <ul
              style={{
                backgroundColor: "green",
              }}
            >
              {world.player.hands.map((item, index) => (
                <li key={index}>{item[0].attributes.name}</li>
              ))}
            </ul>
          </div>

          {world.player.inspecting.length === 1 && (
            <div
              className="readiedItem"
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "15%",
                width: "95%",
                justifyContent: "center",
                alignItems: "center",
                borderStyle: "solid",
                borderColor: "black",
                marginBottom: "1vw",
              }}
            >
              <h3>
                {
                  world.player.inventory[world.player.inspecting[0]].attributes
                    .name
                }{" "}
                Readied!
              </h3>
              <p>Press "E" to equip, or "R" to remove from Inventory</p>
            </div>
          )}

          <div
            className="fullInventory"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "15%",
              width: "95%",
              justifyContent: "center",
              alignItems: "center",
              borderStyle: "solid",
              borderColor: "black",
            }}
          >
            <h3>Inventory</h3>
            <ol type="1">
              {world.player.inventory.map((item, index) => (
                <li key={index} style={{ backgroundColor: "lightblue" }}>
                  {item.attributes.name}
                </li>
              ))}
            </ol>
            <p>Press Number Key to Ready an Item!</p>
          </div>
        </div>

        <div
          className="leftSide"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <canvas
            ref={canvasRef}
            width={width * tilesize * 1}
            height={height * tilesize * 1}
            maxWidth={"75vw"}
            style={{
              border: "1px solid SaddleBrown",
            }}
          ></canvas>
        </div>

        <div
          className="rightSide"
          style={{
            display: "flex",
            flexDirection: "column",
            // justifyContent:'space-evenly',
            alignItems: "center",
            width: "20vw",
            height: "100vh",
            // padding:'1vw',
            borderStyle: "solid",
            borderColor: "black",
          }}
        >
          <div
            className="eventHistory"
            style={{
              height: "40%",
              width: "95%",
              borderStyle: "solid",
              borderColor: "black",
              marginTop: "1vw",
            }}
          >
            <h2
              className="eventHeader"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              Event History
            </h2>
            <ul>
              {world.history.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div
            className="monsterPicture"
            style={{
              display: "flex",
              height: "50%",
              width: "95%",
              borderStyle: "solid",
              borderColor: "black",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1vw",
            }}
          >
            <MonsterDisplay world={world} setWorld={setWorld} />
          </div>
          {/* I am altering the deal. Pray I do not alter it further */}
          {/* <div
            className="monsterStats"
            style={{
              display: "flex",
              height: "20%",
              width: "95%",
              borderStyle: "solid",
              borderColor: "black",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1vw",
            }}
          >
            {" "}
            <MonsterDisplay world={world} setWorld={setWorld} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ReactRogue;
