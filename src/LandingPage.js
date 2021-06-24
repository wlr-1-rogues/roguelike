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
                                But this game has nothing to do with it. 
                                <br></br>
                                <br></br>
                                Stureth, the dark king, has grown powerful in his dark underground kingdom. 
                                <br></br>
                                <br></br>
                                Many adventurers have attempted to end his reign of terror, and many have failed. 
                                <br></br>
                                <br></br>
                                Fight through three exciting levels, gather equipment, and prepare to face the king under the mountain in his...                                
                                <br></br>
                                <br></br>
                                <h1 style={{fontSize:'3vw', marginTop:'-1vw', marginBottom:'-1vw'}}>HYPOGEAN DOMINION</h1>
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


