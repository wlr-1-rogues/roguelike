import React, { useEffect, useState } from "react";
import LP from './LP.css'


const LandingPage = (props) => {

    const [startTitle, setStartTitle] = useState(false)

    useEffect(() => {
        console.log(props)
    }, [])

    return(
                <div className='landingPage'>
                    {!startTitle && <h1 className='landingHeader1'>
                        WELCOME TO
                    </h1>}
                    {!startTitle && <h1 className='landingHeader2'>
                        TITLE OF GAME
                    </h1>}
                    {!startTitle && <div 
                        className='startButton'
                        onClick={() => {setStartTitle(true)}}
                        >~Begin Quest~
                    </div>}
                    {startTitle && <div className='startingPage'>
                        {startTitle && <div className='spHeader'></div>}
                        {startTitle && <div className='startingScript'>
                            <p className='introScript'>Somehow, Palpatine is still alive. 
                                <br></br>
                                <br></br>
                                Somehow, this game has something to do with it. 
                                <br></br>
                                <br></br>
                                Fight through 3 levels of baddies, gathering treasure along the way, to eventually fight the terror which dwells at the end of <br></br>The Cave of Dev Mountain.
                                <br></br>
                                <br></br>
                                We're all counting on you. Good luck.
                            </p>
                            <section
                                className='beginButton'
                                onClick={() => {props.startGame()}}
                                >Click to Begin...
                            </section>
                        </div>}
                        {startTitle && <div className='spHeader'></div>}
                    </div>}
                </div>
    )
}

export default LandingPage