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
                        >Begin Quest
                    </div>}
                    {startTitle && <div className='startingPage'>
                        {startTitle && <div className='spHeader'></div>}
                        {startTitle && <div className='startingScript'>
                            <p>Nostrud et ullamco nisi eiusmod eiusmod do aliquip irure amet do veniam occaecat consectetur deserunt. Fugiat anim tempor voluptate nulla culpa excepteur dolore. Ea reprehenderit ex aute voluptate esse. Tempor quis voluptate velit et aliquip deserunt nulla nisi in. Pariatur cupidatat est voluptate duis nulla non consequat laboris ut in sunt fugiat commodo ipsum. 
                                <br></br>
                                <br></br>
                                Reprehenderit incididunt irure adipisicing occaecat incididunt officia. Cupidatat sit aliquip culpa officia est qui aute aute consequat irure non aliquip ullamco. Id eu anim sint ut magna laboris duis. In excepteur elit nulla dolor. In minim reprehenderit adipisicing non aliqua sit aliquip labore cupidatat ut commodo labore. 
                                <br></br>
                                <br></br>
                                Occaecat veniam dolor aute aliquip cupidatat aliqua ut voluptate occaecat amet non. Dolore enim dolore esse laborum commodo nulla sint voluptate do id consectetur ut. Irure excepteur minim qui proident officia exercitation nostrud exercitation occaecat veniam eiusmod elit officia. Dolore magna incididunt eu enim. Eu culpa eu id amet fugiat sint voluptate anim. Enim sit proident velit nisi. Quis sint culpa commodo culpa fugiat eiusmod excepteur sunt consequat ea quis minim dolore. Laboris cupidatat duis ut consequat.</p>
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