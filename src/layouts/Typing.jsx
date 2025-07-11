import React, { forwardRef } from 'react';
import TextAreaField from '../components/TextAreaField';
import Paragraph from '../components/Paragraph';
import Result from '../components/Result';
import { paragraphs } from '../utils/data';

const Typing = forwardRef(({ idx, isDisabled, setUserText, userText, showResults, timeRequired }, ref) => {
  const handleTextChange = (text) => {
    setUserText(text);
  };
  
  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <Paragraph idx={idx} />
      <TextAreaField 
        ref={ref} 
        setText={handleTextChange} 
        isDisabled={isDisabled} 
        value={userText}
      />
      {showResults && (
        <Result 
          userInput={userText} 
          paragraph={paragraphs[idx]}
          timeRequired={timeRequired}
        />
      )}
    </div>
  );
});

export default React.memo(Typing);