import React, { useRef, useEffect, useState } from "react";
import './styles.css'
import Demon from './assets/uf_heroes/demon_red_1.png';
import Dragon from './assets/uf_heroes/dragon_blue_1.png';
import Golem from './assets/uf_heroes/golem_fire_1.png';
import Banshee from './assets/uf_heroes/banshee_1.png';
import Ogre from './assets/uf_heroes/ogre_1.png';
import Torturer from './assets/uf_heroes/thief_1.png';
import Zombie from './assets/uf_heroes/zombie_a_1.png';
import Snake from './assets/uf_heroes/snake_1.png';
import Goblin1 from './assets/uf_heroes/goblin_1.png';
import Goblin2 from './assets/uf_heroes/goblin_2.png';
import Goblin3 from './assets/uf_heroes/goblin_3.png';



function MonsterDisplay(props) {

    const { world, setWorld } = props;
    const [visibleMonsters, setVisibleMonsters] = useState([]);
    const [monsterIndex, setMonsterIndex] = useState(0);
    const [playerDefense, setPlayerDefense] = useState(world.player.attributes.defense);
    const [monsterPortrait, setMonsterPortrait] = useState(null);

    useEffect(() => {
        setVisibleMonsters([...world.visibleMonsters])
        setMonsterIndex(0);
        if (visibleMonsters) {
            calculateChanceToHit(visibleMonsters[0]);
        }
        setPlayerDefense(world.player.attributes.defense)
        // requireCorrectPortrait('assets/uf_heroes/archer_1.png')
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

    function returnImgJSX() {
        return (
            <img src={Torturer} />
        )
    }


    // let portraits = require('./assets/uf_heroes/archer_1.png')
    // let portraits = require('./assets/uf_heroes/archer_1.png')
    // let portraits = require('./assets/uf_heroes/archer_1.png')

    // let portraits = require('./assets/uf_heroes/archer_1.png')
    // let portraits = require('./assets/uf_heroes/archer_1.png')
    // let portraits = require('./assets/uf_heroes/archer_1.png')

    // let portraits = require('./assets/uf_heroes/archer_1.png')
    // let portraits = require('./assets/uf_heroes/archer_1.png')

    // let portraits = require(monsterPortrait)

    // console.log(portraits)
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


                    {/* I am truly unable to think of a better way to do this, rip. */}
                    {visibleMonsters[monsterIndex].attributes.name === "Zombie" ? <img src={Zombie} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Snake" ? <img src={Snake} /> : <div></div>}

                    {visibleMonsters[monsterIndex].attributes.name === "Goblin" ? <img src={Goblin} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Goblin" ? <img src={Goblin} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Goblin" ? <img src={Goblin} /> : <div></div>}

                    {visibleMonsters[monsterIndex].attributes.name === "Banshee" ? <img src={Banshee} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Ogre" ? <img src={Ogre} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Torturer" ? <img src={Torturer} /> : <div></div>}

                    {visibleMonsters[monsterIndex].attributes.name === "Demon" ? <img src={Demon} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Dragon" ? <img src={Dragon} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Golem" ? <img src={Golem} /> : <div></div>}





                    <h1>Monster: {visibleMonsters[monsterIndex].attributes.name}</h1>
                    {/* <p>{visibleMonsters[monsterIndex].attributes.flavortext}</p> */}





                    <h2>Monster Health: {visibleMonsters[monsterIndex].attributes.health}</h2>
                    <h2>Monster Damage: {visibleMonsters[monsterIndex].attributes.damage}</h2>
                    <h2>Monster Chance to Hit: {calculateChanceToHit(visibleMonsters[monsterIndex].attributes.attack)}</h2>


                </div>


                : <div>Monsters: None</div>}
        </div>
    );
}

export default MonsterDisplay;