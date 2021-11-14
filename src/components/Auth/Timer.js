import React from 'react'
import { useState, useEffect } from 'react';

const Timer = (props) => {
    const [ minutes, setMinutes ] = useState(1);
    const [seconds, setSeconds ] =  useState(30);
    useEffect(()=>{
    let interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(interval);
          };
    });

    return (
        <span>
           
        { minutes === 0 && seconds === 0
            ? 'expired'
            : <b> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</b> 
        } 
           
        </span>
    )
}

export default Timer;