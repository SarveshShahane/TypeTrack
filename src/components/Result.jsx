import React from 'react';

const Result = ({ userInput, paragraph, timeRequired }) => {
  const userWords = userInput.trim().split(/\s+/);
  const paragraphWords = paragraph.trim().split(/\s+/);
  const wordsTyped = userWords.length;
  const correctWords = userWords.filter((word, idx) =>
    idx < paragraphWords.length && word === paragraphWords[idx]
  ).length;
  const incorrectWords = wordsTyped - correctWords;
  const accuracy = ((correctWords / (wordsTyped || 1)) * 100).toFixed(1);
  const wpm = Math.round(correctWords / (timeRequired / 60));
  return (
    <div className='p-4 rounded bg-gray-100 border w-full mt-4'>
      <h2 className='text-xl font-semibold mb-2'>Your Results</h2>
      <div className='grid grid-cols-2 gap-2'>
        <div>
          <p><span className='font-medium'>Accuracy:</span> {accuracy}%</p>
          <p><span className='font-medium'>WPM:</span> {wpm}</p>
        </div>
        <div>
          <p><span className='font-medium'>Correct words:</span> {correctWords}</p>
          <p><span className='font-medium'>Incorrect words:</span> {incorrectWords}</p>
        </div>
      </div>
    </div>
  );
};

export default Result;