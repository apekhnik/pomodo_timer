import React, { useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
const padTime = time => {
    return time.toString().padStart(2,'0')
}
function App() {
  const [timeLeft, setTimeleft] = useState(10)
  const [isRunning, setisRunning] = useState(false)
  const [title, setTitle] = useState('Pomodo')
  const minutes = padTime(Math.floor(timeLeft /60))
  const seconds = padTime(timeLeft - minutes * 60)


  let intervalRef = useRef(null);
  
  const timerStart = () => {
    if(intervalRef.current != null) return;
    setisRunning(true)
    intervalRef.current = setInterval(()=>{
      setTimeleft(timeLeft=>{
        if(timeLeft >= 1){
          return timeLeft-1
        }else{
          setTimeleft(25*60)
          audio.play()
          return 0
        }
        
      })
    },1000)
  }
  const stopTimer = () => {
    if(intervalRef.current === null) return;
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setisRunning(false)
  }
  const resetTimer = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setTimeleft(25*60)
    setisRunning(false)
  }
  let audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3');
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>{title}</h1>
        <div className="timer">
              <span>{minutes}</span>
              <span>:</span>
              <span>{seconds}</span>
        </div>
        <div className='btn-block'>
          {!isRunning && <button onClick={timerStart}>start</button>}
          {isRunning && <button onClick={stopTimer}>stop</button>}
          <button onClick={resetTimer}>reset</button>
        </div>
                      {/* <figure>
                  <figcaption>Listen to the T-Rex:</figcaption>
                  <audio
                      controls
                      src="/media/examples/t-rex-roar.mp3">
                          Your browser does not support the
                          <code>audio</code> element.
                  </audio>
                </figure> */}
      </header>
    </div>
  );
}

export default App;
