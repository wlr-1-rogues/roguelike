import React, { useEffect, useState } from "react";
import LP from './LP.css'


const LandingPage = (props) => {


    useEffect(() => {
        console.log(props)
    }, [])

    return(
        <div className='landingPage'
            style={{
                // background:'url(https://i.pinimg.com/originals/06/c3/95/06c3954b72ae8cfe586ec151efeb29cc.png)',
                display:'flex',
                flexDirection:'column',
                backgroundColor: 'darkgray',
                justifyContent:'space-around',
                alignItems:'center',
                marginTop:'15%',
                marginBottom:'10%'
            }}
            >
            <h1 className='landingHeader1'
                style={{
                    display:'flex',
                    flexDirection:'column',
                    textAlign:'center'
                }}
                >WELCOME TO
                <br></br>
                <h1 className='landingHeader2'
                    style={{
                        display:'flex',
                        flexDirection:'column',
                        textAlign:'center'
                    }}
                >
                    TITLE OF GAME
                </h1>
            </h1>
            
            <div 
                onClick={() => {props.startGame()}}
                style={{
                    display:'flex', 
                    justifyContent:'center',
                    alignItems:'center',
                    cursor:'pointer',
                    backgroundColor:'orange', 
                    width:'20%',
                    height:'10vh',
                    marginTop:'-1.5vh',
                    marginBottom:'5vh', 
                    fontSize:'5vh'

                    }}
            >Begin Quest</div>
        </div>
    )
}

export default LandingPage