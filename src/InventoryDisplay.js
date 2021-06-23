import { useState } from "react";

function InventoryDisplay(props) {
    const {world, atlas} = props
    const [inspecting] = world.player.inspecting

    console.log(atlas)
    return (
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
                    backgroundColor:'rgba(211, 211, 211, 0.598)'
                }}
                >
                <h3>Equipped Items</h3>
                {world.player.left.map((item, index) => (
                    <p key={index} style={{ height: 19}}>
                    6. {item.name}
                    </p>
                ))}
                {world.player.right.map((item, index) => (
                    <p key={index} style={{ height: 19}}>
                    7. {item.name}
                    </p>
                ))}
                {world.player.head.map((item, index) => (
                    <p key={index} style={{ height: 19}}>
                    8. {item.name}
                    </p>
                ))}
                {world.player.torso.map((item, index) => (
                    <p key={index} style={{ height: 19}}>
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
                    backgroundColor:'rgba(211, 211, 211, 0.598)'
                    }}
                >
                    <h3>{inspecting.item.name} Readied!</h3>
                    <h4>Upon inspecting the {inspecting.item.name} you find...</h4>
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
                    backgroundColor:'rgba(211, 211, 211, 0.598)'
                }}
                >
                <h3>Inventory</h3>
                <ol type="1">
                    {world.player.inventory.map((item, index) => (
                    <li key={index}>
                        {item.name}
                    </li>
                    ))}
                </ol>
                <p>Press Number Key to Ready an Item!</p>
                </div>
            </div>
        </div>
    );
}

export default InventoryDisplay