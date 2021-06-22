import React, { useRef, useEffect, useState } from "react";
import MonsterDisplay from "./MonsterDisplay";
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
    spawner.spawnMonsters(50);
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
                Hit:
                <br></br>
                Defense:
                <br></br>
                Damage:
                <br></br>
                Block:
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
                {world.player.attributes.block}
                <br></br>
                {world.player.attributes.health} /{" "}
                {world.player.attributes.maxHealth}
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
            {world.player.left.map((item, index) => (
              <p key={index} style={{ height: 19, backgroundColor: "green" }}>
                6. {item.name}
              </p>
            ))}
            {world.player.right.map((item, index) => (
              <p key={index} style={{ height: 19, backgroundColor: "green" }}>
                7. {item.name}
              </p>
            ))}
            {world.player.head.map((item, index) => (
              <p key={index} style={{ height: 19, backgroundColor: "green" }}>
                8. {item.name}
              </p>
            ))}
            {world.player.torso.map((item, index) => (
              <p key={index} style={{ height: 19, backgroundColor: "green" }}>
                9. {item.name}
              </p>
            ))}
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
              <h3>{inspecting.item.name} Readied!</h3>
              <h4>upon inspecting the {inspecting.item.name} you find...</h4>
              {inspecting.item.class === "weapon" ? (
                <div>
                  <p>Attack +{inspecting.item.mod1}</p>
                  <p>Damage +{inspecting.item.mod2}</p>
                </div>

              ) : inspecting.item.class === "shield" ? (
                  <p>Block + {inspecting.item.mod1}</p>

              ) : inspecting.item.class === "head" ||
                inspecting.item.class === "torso" ? (
                  <p>Defense +{inspecting.item.mod1}</p>

              ) : inspecting.item.class === "healthCon" ? (
                <p>Health +{inspecting.item.mod1}</p>

              ) : inspecting.item.class === "shieldCon" ? (
                <p>Block +{inspecting.item.mod1}</p>

              ) : (
                <p>A dusty old tome with strange symbols</p>
              )}
              
              {typeof inspecting.pos === "string" ? (
                <p>Press "Q" to unequip, or "K" to destroy</p>
              ) : inspecting.item.name === "Tome of Fireball" ? (
                <p>Press fire direction, or "K" to destroy</p>
              ) : inspecting.item.class === "healthCon" ||
                inspecting.item.class === "shieldCon" ? (
                <p>Press "E" to drink, or "K" to destroy</p>
              ) : (
                <p>Press "E" to equip, or "K" to destroy</p>
              )}
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
                  {item.name}
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

          <div className="monster-box">
            <MonsterDisplay world={world} setWorld={setWorld} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactRogue;
