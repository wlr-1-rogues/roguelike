import React, { useRef, useEffect, useState } from "react";
import MonsterDisplay from "./MonsterDisplay";
import InventoryDisplay from "./InventoryDisplay"
import InputManager from "./InputManager";
import Player from "./Player";
import Spawner from "./Spawner";
import World from "./World";
import Fireball from "./Fireball";

const ReactRogue = ({ width, height, tilesize, atlases }) => {
  const canvasRef = React.useRef(null);
  const [world, setWorld] = useState(
    new World(width, height, tilesize, atlases, 1)
  );

  const [inspecting] = world.player.inspecting;
  const currentHealth = world.player.attributes.health;
  const maxHealth = world.player.attributes.maxHealth;
  const healthBar = (currentHealth / maxHealth) * 100;

  let inputManager = new InputManager();
  const handleInput = (action, data) => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    if (action === "move") {
      if (inspecting?.item.name === "Tome of Fireball") {
        console.log("shoot", data.x, data.y);
        let fireDirection = "up";

        if (data.y < 0 && data.x === 0) {
          fireDirection = "up";
        } else if (data.y > 0 && data.x === 0) {
          fireDirection = "down";
        } else if (data.y === 0 && data.x > 0) {
          fireDirection = "right";
        } else if (data.y === 0 && data.x < 0) {
          fireDirection = "left";
        }

        console.log(fireDirection);
        newWorld.add(
          new Fireball(world.player.x, world.player.y, tilesize, fireDirection)
        );
        console.log(world.player.x);
        console.log(newWorld.entities);
        newWorld.castSpell();
      } else {
        newWorld.movePlayer(data.x, data.y);
      }
    } else if (action === "inspect") {
      newWorld.inspectItem(data);
    } else if (action === "equip") {
      newWorld.equipItem();
    } else if (action === "inspectE") {
      newWorld.inspectEquip(data);
    } else if (action === "unequip") {
      newWorld.unequipItem();
    } else if (action === "drop") {
      newWorld.dropItem();
    }

    newWorld.moveProjectiles();
    newWorld.moveMonsters();
    setWorld(newWorld);
  };

  useEffect(() => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);
    let spawner = new Spawner(newWorld);
    spawner.spawnLoot();
    spawner.spawnMonsters(100);
    spawner.spawnStairs();
    setWorld(newWorld);
    console.log((`${currentHealth}` / `${maxHealth}`) * 100);
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
    <div
      style={{
        background:
          "url(https://i.pinimg.com/originals/06/c3/95/06c3954b72ae8cfe586ec151efeb29cc.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          height: "1.5vh",
          width: "98vw",
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
              backgroundColor: "rgba(211, 211, 211, 0.598)",
            }}
          >
            <h3>Player Stats</h3>
            <section
              style={{
                display: "flex",
                height: "2.5vh",
                width: "32.5%",
                borderStyle: "solid",
                borderColor: "black",
                marginTop: "-1vh",
                marginBottom: "1vh",
                backgroundColor: "red",
                zIndex: 1,
              }}
            >
              <section
                style={{
                  height: "100%",
                  width: `${healthBar}%`,
                  backgroundColor: "green",
                  zIndex: 2,
                  textAlign: "center",
                  color: "white",
                }}
              >
                <section
                  style={{
                    minWidth: "6.25vw",
                  }}
                >
                  HP: {world.player.attributes.health} /{" "}
                  {world.player.attributes.maxHealth}
                </section>
              </section>
            </section>

            <div
              style={{
                display: "flex",
                width: "35%",
                justifyContent: "space-between",
              }}
            >
              <div>
                Hit:
                <br></br>
                Defense:
                <br></br>
                Damage:
                <br></br>
                Block:
                <br></br>
                {/* Health:
                <br></br> */}
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
                {world.player.attributes.block}
                <br></br>
                {/* {world.player.attributes.health}
                <br></br> */}
                {world.player.attributes.sightRadius}
                <br></br>
                <br></br>
              </div>
            </div>
          </div>
          <InventoryDisplay atlas={atlases.itemAtlas} world={world} />
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
              marginTop: "2vh",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "white",
            }}
          ></canvas>
        </div>

          <div
            className="rightSide"
            style={{
              height: "40%",
              width: "95%",
              borderStyle: "solid",
              borderColor: "black",
              marginTop: "1vw",
              backgroundColor: "rgba(211, 211, 211, 0.598)",
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
                backgroundColor:'rgba(211, 211, 211, 0.598)'
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

            <div className="monster-box">
              <MonsterDisplay world={world} setWorld={setWorld} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactRogue;
