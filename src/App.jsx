import { React, useEffect, useRef, useState } from 'react';
import './App.css';
import Button from './components/Button';
import Clock from './components/Clock';
import { paragraphs } from './utils/data';
import Typing from './layouts/Typing';

const App = () => {
  const inputRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [reset, setReset] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [userText, setUserText] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(null);
  
  const onReset = () => {
    setReset(true);
    setStart(false);
    setDisabled(true);
    setShowResults(false);
    setUserText('');
    setElapsedTime(0);
    startTimeRef.current = null;
  };

  const handleClick = () => {
    const newStartState = !start;
    setStart(newStartState);
    setDisabled(!newStartState);
    
    if (newStartState) {
      setIndex(Math.floor(Math.random() * paragraphs.length));
      setShowResults(false);
      setUserText('');
      startTimeRef.current = Date.now();
      setElapsedTime(0);
    } else {
      setShowResults(true);
      const timeElapsed = (Date.now() - startTimeRef.current) / 1000;
      setElapsedTime(timeElapsed);
    }
  };

  const handleComplete = () => {
    setStart(false);
    setDisabled(true);
    setShowResults(true);
    const timeElapsed = (Date.now() - startTimeRef.current) / 1000;
    setElapsedTime(timeElapsed);
  };

  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [start, disabled]);

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Mau Typing Coach</h1>
      <div className="flex gap-4 mb-4">
        <Button name={start ? "Stop" : "Start"} handleClick={handleClick} />
        <Button name="Reset" handleClick={onReset} />
      </div>
      <Clock
        duration={60}
        start={start}
        reset={reset}
        onResetDone={() => setReset(false)}
        onComplete={handleComplete}
      />
      <Typing
        idx={index}
        ref={inputRef}
        isDisabled={disabled}
        setUserText={setUserText}
        userText={userText}
        showResults={showResults}
        timeRequired={elapsedTime}
      />
    </div>
  );
};

export default App;