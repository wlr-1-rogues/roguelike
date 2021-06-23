import React, { useRef, useEffect, useState } from "react";
import './styles.css'
import Demon1 from './assets/uf_heroes/demon_red_1.png';
import Demon2 from './assets/uf_heroes/demon_red_2.png';
import Demon3 from './assets/uf_heroes/demon_red_3.png';

import Dragon1 from './assets/uf_heroes/dragon_blue_1.png';
import Dragon2 from './assets/uf_heroes/dragon_blue_2.png';
import Dragon3 from './assets/uf_heroes/dragon_blue_3.png';

import Golem1 from './assets/uf_heroes/golem_fire_1.png';
import Golem2 from './assets/uf_heroes/golem_fire_2.png';
import Golem3 from './assets/uf_heroes/golem_fire_3.png';

import Banshee1 from './assets/uf_heroes/banshee_1.png';
import Banshee2 from './assets/uf_heroes/banshee_2.png';
import Banshee3 from './assets/uf_heroes/banshee_3.png';

import Ogre1 from './assets/uf_heroes/ogre_1.png';
import Ogre2 from './assets/uf_heroes/ogre_2.png';
import Ogre3 from './assets/uf_heroes/ogre_3.png';

import Torturer1 from './assets/uf_heroes/thief_1.png';
import Torturer2 from './assets/uf_heroes/thief_2.png';
import Torturer3 from './assets/uf_heroes/thief_3.png';

import Zombie1 from './assets/uf_heroes/zombie_a_1.png';
import Zombie2 from './assets/uf_heroes/zombie_a_2.png';
import Zombie3 from './assets/uf_heroes/zombie_a_3.png';

import Snake1 from './assets/uf_heroes/snake_1.png';
import Snake2 from './assets/uf_heroes/snake_2.png';
import Snake3 from './assets/uf_heroes/snake_3.png';

import Goblin1 from './assets/uf_heroes/goblin_1.png';
import Goblin2 from './assets/uf_heroes/goblin_2.png';
import Goblin3 from './assets/uf_heroes/goblin_3.png';



function MonsterDisplay(props) {

    const { world, setWorld } = props;
    const [visibleMonsters, setVisibleMonsters] = useState([]);
    const [monsterIndex, setMonsterIndex] = useState(0);
    const [playerDefense, setPlayerDefense] = useState(world.player.attributes.defense);
    const [monsterPortrait, setMonsterPortrait] = useState(null);
    const [animationCount, setAnimationCount] = useState(1);



    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;

        interval = setInterval(() => {
            if (animationCount <= 2) {
                setAnimationCount(animationCount => animationCount + 1);
            } else {
                setAnimationCount(1);
            }

        }, 200);


        return () => clearInterval(interval);
    }, [isActive, animationCount]);

    useEffect(() => {

    }, [])

    useEffect(() => {
        setVisibleMonsters([...world.visibleMonsters])
        setMonsterIndex(0);
        if (visibleMonsters) {
            calculateChanceToHit(visibleMonsters[0]);
            // animationIterator();
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
        return chance;

    }

    function iterateAnimationCount(num) {
        setAnimationCount(num);
        return (<div>NOTHING </div>)
    }


    return (

        <div>

            {visibleMonsters[0] ?
                <div>
                    {visibleMonsters.length > 1 ?
                        <div>
                            <button style={{color:'black'}} onClick={() => { changeMonsterFocus(-1) }}>Focus on Last Monster</button>
                            <button style={{color:'black'}} onClick={() => { changeMonsterFocus(1) }}>Focus on Next Monster</button>
                        </div>

                        : <div></div>}

                    <br />


                    {/* LEVEL ONE MONSTER PORTRAITS */}
                    {visibleMonsters[monsterIndex].attributes.name === "Zombie" && (animationCount === 1) ? <img src={Zombie1} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Zombie" && (animationCount === 2) ? <img src={Zombie2} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Zombie" && (animationCount === 3) ? <img src={Zombie3} /> : <div></div>}

                    {visibleMonsters[monsterIndex].attributes.name === "Snake" && (animationCount === 1) ? <img src={Snake1} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Snake" && (animationCount === 2) ? <img src={Snake2} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Snake" && (animationCount === 3) ? <img src={Snake3} /> : <div></div>}

                    {(visibleMonsters[monsterIndex].attributes.name === "Goblin") && (animationCount === 1) ? <img src={Goblin1} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Goblin" && (animationCount === 2) ? <img src={Goblin2} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Goblin" && (animationCount === 3) ? <img src={Goblin3} /> : <div></div>}

                    {/* LEVEL TWO MONSTER PORTRAITS */}
                    {visibleMonsters[monsterIndex].attributes.name === "Banshee" && (animationCount === 1) ? <img src={Banshee1} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Banshee" && (animationCount === 2) ? <img src={Banshee2} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Banshee" && (animationCount === 3) ? <img src={Banshee3} /> : <div></div>}

                    {visibleMonsters[monsterIndex].attributes.name === "Ogre" && (animationCount === 1) ? <img src={Ogre1} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Ogre" && (animationCount === 2) ? <img src={Ogre2} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Ogre" && (animationCount === 3) ? <img src={Ogre3} /> : <div></div>}

                    {visibleMonsters[monsterIndex].attributes.name === "Torturer" && (animationCount === 1) ? <img src={Torturer1} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Torturer" && (animationCount === 2) ? <img src={Torturer2} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Torturer" && (animationCount === 3) ? <img src={Torturer3} /> : <div></div>}

                    {/* LEVEL THREE MONSTER PORTRAITS */}
                    {visibleMonsters[monsterIndex].attributes.name === "Demon" && (animationCount === 1) ? <img src={Demon1} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Demon" && (animationCount === 2) ? <img src={Demon2} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Demon" && (animationCount === 3) ? <img src={Demon3} /> : <div></div>}


                    {visibleMonsters[monsterIndex].attributes.name === "Dragon" && (animationCount === 1) ? <img src={Dragon1} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Dragon" && (animationCount === 2) ? <img src={Dragon2} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Dragon" && (animationCount === 3) ? <img src={Dragon3} /> : <div></div>}

                    {visibleMonsters[monsterIndex].attributes.name === "Golem" && (animationCount === 1) ? <img src={Golem1} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Golem" && (animationCount === 2) ? <img src={Golem2} /> : <div></div>}
                    {visibleMonsters[monsterIndex].attributes.name === "Golem" && (animationCount === 3) ? <img src={Golem3} /> : <div></div>}





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