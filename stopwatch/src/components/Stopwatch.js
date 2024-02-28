import React from 'react'
import { useState, useEffect } from 'react';
import '../App.css';

const Stopwatch = () => {
    
  const [time, setTime] = useState(0);
  const [isRunning, setIsrunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      
      intervalId = setInterval(() => {
      setTime(time + 1)   
      }, 10);
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [time, isRunning])

    const hour = Math.floor(time / 360000);
    const min = Math.floor((time % 360000) /6000);
    const sec = Math.floor((time % 6000) /100);
    const milisec = Math.floor(time % 100);

  function reset(){
    setIsrunning(false);
    setTime(0);
  }

  return (
    <div className='stopwatch-box'>
        <div className='timer'>{hour}:{min.toString().padStart(2,0)}:{sec.toString().padStart(2,0)}:{milisec.toString().padStart(2,0)}</div>
    <div className='buttons-div'>

        <button className='buttons' id='start-stop' onClick={()=>setIsrunning(!isRunning)}> {isRunning?  'Stop': 'Start' }</button>
        <button className='buttons' id='reset' onClick={reset}>Reset</button>
    </div>
    </div>
  )
}

export default Stopwatch