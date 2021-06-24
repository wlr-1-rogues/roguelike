import React, { useEffect, useState } from "react";
import LP from './LP.css'


const LandingPage = (props) => {

    const [startTitle, setStartTitle] = useState(false)

    useEffect(() => {
        console.log(props)
    }, [])

    return(
                <div className='landingPage'>
                    <div className='landingHeader1'>
                        {!startTitle && <h1 className='landingHeader11'>
                            WELCOME
                        </h1>}
                        {!startTitle && <h1 className='landingHeader11'>
                            TO
                        </h1>}
                    </div>
                    <div style={{display:'flex', justifyContent:'space-around', gap:'5vw'}}>
                        {!startTitle && <h1 className='landingHeader2'>
                            HYPOGEAN
                        </h1>}
                        {!startTitle && <h1 className='landingHeader2'>
                            DOMINION
                        </h1>}

                    </div>
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