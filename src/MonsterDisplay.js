import React, { useRef, useEffect, useState } from "react";
import './styles.css'

function MonsterDisplay(props) {

    const { world, setWorld } = props;
    const [visibleMonsters, setVisibleMonsters] = useState([]);
    const [monsterIndex, setMonsterIndex] = useState(0);
    const [playerDefense, setPlayerDefense] = useState(world.player.attributes.defense);
    useEffect(() => {
        
        setVisibleMonsters([...world.visibleMonsters])
        setMonsterIndex(0);
        if (visibleMonsters) {
            calculateChanceToHit(visibleMonsters[0]);
        }
        setPlayerDefense(world.player.attributes.defense)
    }, [world]);

    function changeMonsterFocus(num) {
        if (monsterIndex !== 0 && num < 0) {
            let newIndex = monsterIndex - 1
            setMonsterIndex(newIndex);
        } else if (monsterIndex < visibleMonsters.length - 1 && num === 1) {
            let newIndex = monsterIndex + 1
            setMonsterIndex(newIndex);
        } else {
            setMonsterIndex(0);
        }
    }

    function calculateChanceToHit(attack) {
        let hit = 20 - (playerDefense - attack);
        let chance = (hit / 20) * 100;
        console.log(chance)
        return chance;

    }


    return (

        <div>
            {visibleMonsters[0] ?
                <div>
                    {visibleMonsters.length > 1 ?
                        <div>
                            <button onClick={() => { changeMonsterFocus(-1) }}>Focus on Last Monster</button>
                            <button onClick={() => { changeMonsterFocus(1) }}>Focus on Next Monster</button>
                        </div>

                        : <div></div>}

                    <br />
                    <img src="https://i.redd.it/rucbstwxumb21.jpg" />


                    <h1>Monster: {visibleMonsters[monsterIndex].attributes.name}</h1>
                    <p>{visibleMonsters[monsterIndex].attributes.flavortext}</p>
                    <h2>Monster Health: {visibleMonsters[monsterIndex].attributes.health}</h2>
                    <h2>Monster Damage: {visibleMonsters[monsterIndex].attributes.damage}</h2>
                    <h2>Monster Chance to Hit: {calculateChanceToHit(visibleMonsters[monsterIndex].attributes.attack)}</h2>


                </div>


                : <div>Monsters: None</div>}
        </div>
    );
}

export default MonsterDisplay;